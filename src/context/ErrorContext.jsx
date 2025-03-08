import React, { createContext, useContext, useState, useEffect } from "react";
import { ErrorHandler } from "@utils/errorHandler";
import { logger } from "@utils/logger";

const ErrorContext = createContext(null);

export const useErrorContext = () => {
	const context = useContext(ErrorContext);
	if (!context) {
		throw new Error("useErrorContext must be used within an ErrorProvider");
	}
	return context;
};

export const ErrorProvider = ({ children }) => {
	const [globalError, setGlobalError] = useState(null);
	const [errorCount, setErrorCount] = useState(0);

	// Capture unhandled errors
	useEffect(() => {
		const handleGlobalError = (event) => {
			// Prevent default browser error handling
			event.preventDefault();

			// Extract error details
			const { message, filename, lineno, colno, error } = event;

			// Log to monitoring service
			ErrorHandler.logErrorToMonitoring(
				error || new Error(message),
				"unhandled-global"
			);

			// Set global error state
			setGlobalError({
				message: "An unexpected error occurred. Our team has been notified.",
				details: `${message} (${filename}:${lineno}:${colno})`,
				timestamp: new Date().toISOString(),
			});

			setErrorCount((prev) => prev + 1);

			return true;
		};

		// Handle unhandled rejections
		const handlePromiseRejection = (event) => {
			// Log to monitoring service
			ErrorHandler.logErrorToMonitoring(event.reason, "unhandled-promise");

			// Set global error state
			setGlobalError({
				message:
					"An unexpected error occurred in the background. Our team has been notified.",
				details: event.reason?.message || "Promise rejection",
				timestamp: new Date().toISOString(),
			});

			setErrorCount((prev) => prev + 1);

			return true;
		};

		// Add event listeners
		window.addEventListener("error", handleGlobalError);
		window.addEventListener("unhandledrejection", handlePromiseRejection);

		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener("error", handleGlobalError);
			window.removeEventListener("unhandledrejection", handlePromiseRejection);
		};
	}, []);

	// Clear error after 10 seconds
	useEffect(() => {
		if (globalError) {
			const timer = setTimeout(() => {
				setGlobalError(null);
			}, 10000);

			return () => clearTimeout(timer);
		}
	}, [globalError, errorCount]);

	// Track application errors
	useEffect(() => {
		if (errorCount > 5) {
			logger.error("Multiple errors detected - potential stability issue");
		}
	}, [errorCount]);

	// Report error to server
	const reportError = async (error, context = "manual-report") => {
		try {
			ErrorHandler.logErrorToMonitoring(error, context);

			// In a production app, you might send this to your server
			// const response = await fetch('/api/error-report', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ error: error.message, context, stack: error.stack })
			// });

			return true;
		} catch (err) {
			logger.error("Failed to report error:", err);
			return false;
		}
	};

	// Clear current error
	const clearError = () => setGlobalError(null);

	const contextValue = {
		globalError,
		setGlobalError,
		reportError,
		clearError,
		errorCount,
	};

	return (
		<ErrorContext.Provider value={contextValue}>
			{children}

			{/* Global error message */}
			{globalError && (
				<div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-red-50 border border-red-200 rounded-lg shadow-lg">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="w-5 h-5 text-red-500"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-red-800">
								{globalError.message}
							</h3>
							<button
								onClick={clearError}
								className="mt-2 text-xs text-red-600 hover:underline"
							>
								Dismiss
							</button>
						</div>
					</div>
				</div>
			)}
		</ErrorContext.Provider>
	);
};
