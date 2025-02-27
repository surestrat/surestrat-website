import Navbar from "@components/Navbar";
import HeroSection from "@components/sections/Hero/HeroSection";
import About from "@components/sections/about/About";
import FeatureSection from "@components/sections/features/FeatureSection";
import Partners from "@components/sections/partners/Partners";
import Compliance from "@components/sections/compliance/Compliance";
import Pricing from "@components/sections/pricing/Pricing";
import ClaimsProcess from "@components/sections/ClaimsProcess/ClaimsProcess";
``;
import Testimonials from "@components/sections/testimonials/Testimonials";
import Footer from "@components/Footer";
// import SurveyComponent from "@components/SurveyComponent";
const LandingPage = () => {
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
