import { useEffect } from "react";
import Navbar from "@components/Navbar";
import HeroSection from "@components/sections/Hero/HeroSection";
import About from "@components/sections/about/About";
import FeatureSection from "@components/sections/features/FeatureSection";
import Partners from "@components/sections/partners/Partners";
import Compliance from "@components/sections/compliance/Compliance";
import Pricing from "@components/sections/pricing/Pricing";
import ClaimsProcess from "@components/sections/ClaimsProcess/ClaimsProcess";
import Testimonials from "@components/sections/testimonials/Testimonials";
import Footer from "@components/Footer";
// import SurveyComponent from "@components/SurveyComponent";

const LandingPage = () => {
	console.log("📄 LandingPage component rendered");

	useEffect(() => {
		console.log("⏱️ LandingPage mounted");
		const startTime = performance.now();

		return () => {
			const endTime = performance.now();
			console.log(
				`⏱️ LandingPage unmounted after ${(endTime - startTime).toFixed(2)}ms`
			);
		};
	}, []);

	useEffect(() => {
		console.log("🖼️ Checking images loading status...");

		// Track when all images have loaded
		window.addEventListener("load", () => {
			console.log("🖼️ All resources loaded");
		});

		// Track performance metrics
		if (window.performance) {
			const perfData = window.performance.timing;
			const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
			console.log(`⚡ Page load performance: ${pageLoadTime}ms`);
		}
	}, []);

	return (
		<>
			<Navbar />
			<div className="pt-0 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<HeroSection />
				<About />
				<FeatureSection />
				<Partners />
				<ClaimsProcess />
				<Compliance />
				<Pricing />
				<Testimonials />
				<Footer />
				{/* <SurveyComponent /> */}
			</div>
		</>
	);
};

export default LandingPage;
