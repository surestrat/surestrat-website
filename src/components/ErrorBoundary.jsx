import { Component } from "react";
import { AlertCircle, Home } from "lucide-react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
		console.log("🛡️ ErrorBoundary initialized");
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		// Log the error
		console.error(
			"⛔ ErrorBoundary caught an error:",
			error.message,
			"Component Stack:",
			errorInfo.componentStack
		);

		// Additional debug info
		console.debug("📑 Component stack:", errorInfo.componentStack);
		console.debug("🔍 Debug environment:", {
			userAgent: navigator.userAgent,
			language: navigator.language,
			screenSize: `${window.innerWidth}x${window.innerHeight}`,
			url: window.location.href,
			timestamp: new Date().toISOString(),
		});

		// Set the state
		this.setState({
			hasError: true,
			error,
			errorInfo,
		});

		// You could also log to an error reporting service here
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
					<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
						<div className="flex items-center justify-center">
							<div className="bg-red-100 p-3 rounded-full">
								<AlertCircle className="h-8 w-8 text-red-600" />
							</div>
						</div>
						<div className="text-center">
							<h1 className="text-xl font-bold text-gray-900 mb-2">
								Something went wrong
							</h1>
							<div className="text-sm text-gray-500">
								{this.state.error && (
									<p className="mb-2">Error: {this.state.error.toString()}</p>
								)}
								<p>
									We've encountered an unexpected error. Please try refreshing
									the page or come back later.
								</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<button
								onClick={() => window.location.reload()}
								className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Try Again
							</button>
							<a
								href="/"
								className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center"
							>
								<Home className="h-4 w-4 mr-1" /> Go Home
							</a>
						</div>
						{process.env.NODE_ENV === "development" && (
							<div className="mt-4 p-3 bg-gray-100 rounded-md text-xs font-mono text-gray-700 overflow-auto max-h-40">
								{this.state.errorInfo && this.state.errorInfo.componentStack}
							</div>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
