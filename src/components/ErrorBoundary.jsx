import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
		console && console.log("🛡️ ErrorBoundary initialized");
	}

	static getDerivedStateFromError(error) {
		console &&
			console.error("⛔ ErrorBoundary caught an error:", error.message);
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console && console.error("💥 Error details:", error);
		console && console.error("📑 Component stack:", errorInfo.componentStack);

		// Log browser and environment information for debugging
		console &&
			console.log("🔍 Debug environment:", {
				userAgent: navigator.userAgent,
				language: navigator.language,
				screenSize: `${window.innerWidth}x${window.innerHeight}`,
				url: window.location.href,
				timestamp: new Date().toISOString(),
			});

		this.setState({
			error,
			errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex items-center justify-center min-h-screen bg-gray-100">
					<div className="text-center p-8 bg-white rounded-lg shadow-md">
						<h1 className="text-2xl font-bold text-red-600 mb-4">
							Something went wrong
						</h1>
						<p className="text-gray-600 mb-4">
							Please try refreshing the page or contact support if the problem
							persists.
						</p>
						{this.state.error && (
							<div className="mb-4 p-4 bg-gray-100 rounded text-left overflow-auto max-h-40 text-xs">
								<pre>{this.state.error.toString()}</pre>
							</div>
						)}
						<button
							onClick={() => {
								console && console.log("🔄 User attempted page refresh");
								window.location.reload();
							}}
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						>
							Refresh Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
