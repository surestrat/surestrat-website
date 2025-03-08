import LandingPage from "@pages/LandingPage";
import ClaimsPortalPage from "@pages/ClaimsPortalPage";
import QuoteForm from "@pages/QuoteForm";
import "@styles/index.css";
import { Toaster } from "react-hot-toast";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { Suspense, useEffect } from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import ToastProvider from "./components/providers/ToastProvider";
import { ErrorProvider } from "@context/ErrorContext";

// Route logger component
const RouteLogger = () => {
	const location = useLocation();

	useEffect(() => {
		console && console.log(`🧭 Route changed to: ${location.pathname}`);
		console && console.log(`📊 Query params:`, location.search);
		console && console.log(`🔍 Current state:`, location.state);
	}, [location]);

	return null;
};

// ENTRY POINT
function App() {
	console && console.log("🚀 App initialized");

	return (
		<ErrorBoundary>
			<ErrorProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<Router>
						<RouteLogger />
						<ToastProvider />
						{/* Toast notifications */}
						<Toaster
							position="top-right"
							toastOptions={{
								duration: 5000,
								style: {
									background: "#363636",
									color: "#fff",
								},
								success: {
									duration: 3000,
									theme: {
										primary: "#4aed88",
									},
								},
								error: {
									duration: 4000,
									theme: {
										primary: "#ff4b4b",
									},
								},
							}}
						/>

						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/claims-portal" element={<ClaimsPortalPage />} />
							<Route path="/get-quote" element={<QuoteForm />} />
							<Route path="/contact" element={<div>Contact</div>} />
							<Route
								path="*"
								element={
									<div className="flex items-center justify-center min-h-screen">
										<div className="text-center">
											<h1 className="text-4xl font-bold text-gray-800">404</h1>
											<p className="mt-2 text-lg text-gray-600">
												Page not found
											</p>
										</div>
									</div>
								}
							/>
						</Routes>
					</Router>
				</Suspense>
			</ErrorProvider>
		</ErrorBoundary>
	);
}

export default App;
