import { motion } from "framer-motion";
import {
	CirclePattern,
	BackgroundPattern,
	WavePattern,
} from "@components/ui/BgPattern";
import { ArrowRight } from "lucide-react";
import { aboutValues, aboutStats } from "@constants";
import PillHeader from "@components/ui/PillHeader";
import Heading from "@components/ui/Heading";
import Subheading from "@components/ui/Subheading";

import StorySection from "./StorySection";
import StatsGrid from "./StatsGrid";
import ValuesGrid from "./ValuesGrid";
import CTASection from "./CTASection";
const About = () => {
	return (
		<section className="relative py-20 overflow-hidden lg:py-32" id="about">
			<BackgroundPattern />
			<CirclePattern />
			<WavePattern />

			<div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 -z-10" />

			{/* Rest of your component code remains the same */}
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 -z-10" />

			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="relative text-center"
				>
					<PillHeader name="About Us" />
					<Heading
						whiteText="Your Trusted Partner in"
						blueText="South African Insurance"
					/>
					<Subheading
						text="With over 10 years of experience, we've been helping South Africans
						protect what matters most through comprehensive insurance solutions."
					/>
				</motion.div>

				{/* Story Section */}
				<StorySection />

				{/* Stats Grid - Replace the existing stats section */}
				<StatsGrid />
				{/* Values Grid */}
				<ValuesGrid />

				{/* CTA Section */}
				<CTASection />
			</div>
		</section>
	);
};

export default About;
