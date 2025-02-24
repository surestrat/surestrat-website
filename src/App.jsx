import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import ClaimsProcess from "./components/ClaimsProcess";
import Partners from "./components/Partners";
import Compliance from "./components/Compliance";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
	return (
		<>
			<Navbar />
			<div className="max-w-7xl mx-auto pt-0 px-6">
				<HeroSection />
				<About />
				<FeatureSection />
				<Partners />
				<ClaimsProcess />
				<Compliance />
				<Pricing />
				<Testimonials />
				<Footer />
			</div>
		</>
	);
};

export default App;
