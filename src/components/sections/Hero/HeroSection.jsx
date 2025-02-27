import ContentColumn from "./ContentColumn";
import ImageColumn from "./ImageColumn";
import FeaturesGrid from "./FeaturesGrid";
import CTASection from "./CTASection";
import TrustIndicators from "./TrustIndicators";
const HeroSection = () => {
	return (
		<div className="relative min-h-screen overflow-hidden" id="hero">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 -z-10" />
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />

			<div className="container px-4 pt-10 pb-16 mx-auto sm:px-6 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
				<div className="items-center lg:grid lg:grid-cols-2 lg:gap-12">
					{/* Content Column */}
					<div className="relative z-10 max-w-2xl lg:max-w-none">
						<ContentColumn />

						{/* CTA Section */}
						<CTASection />

						{/* Trust Indicators */}
						<TrustIndicators />
					</div>

					{/* Image Column */}
					<ImageColumn />
				</div>

				{/* Features Grid */}
				<FeaturesGrid />
			</div>
		</div>
	);
};

export default HeroSection;
