import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}
	//192.168.10.1
	componentDidCatch(error, errorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
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
						<button
							onClick={() => window.location.reload()}
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
