import LandingPage from "@pages/LandingPage";
import ClaimsPortalPage from "@pages/ClaimsPortalPage";
import QouteForm from "@pages/QuoteForm";
import "@styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/claims-portal" element={<ClaimsPortalPage />} />
				<Route path="/get-quote" element={<QouteForm />} />
				<Route path="/contact" element={<div>Contact</div>} />
			</Routes>
		</Router>
	);
}

export default App;
