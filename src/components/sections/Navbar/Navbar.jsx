import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLogo from "./NavLogo";
import NavItem from "./NavItems";
import CTAButtons from "./NavCTAButtons";
import MobileMenu from "./MobileMenu";
import { navItems } from "@constants";

const Navbar = () => {
	const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) setMobileDrawerOpen(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			className={`sticky top-0 z-50 w-full transition-all duration-300 ${
				scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 xs:px-6">
				<div className="flex items-center justify-between h-14 xs:h-16 sm:h-20">
					<NavLogo />

					<div className="hidden lg:flex items-center justify-between flex-1 ml-8">
						<ul className="flex items-center space-x-6 xl:space-x-10">
							{navItems.map((item, index) => (
								<NavItem key={index} {...item} />
							))}
						</ul>
						<CTAButtons />
					</div>

					<motion.button
						whileTap={{ scale: 0.95 }}
						onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
						className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
						aria-label="Toggle Menu"
					>
						<AnimatePresence mode="wait">
							{mobileDrawerOpen ? (
								<motion.div
									key="close"
									initial={{ opacity: 0, rotate: -90 }}
									animate={{ opacity: 1, rotate: 0 }}
									exit={{ opacity: 0, rotate: 90 }}
									transition={{ duration: 0.2 }}
								>
									<X className="w-5 h-5" />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ opacity: 0, rotate: 90 }}
									animate={{ opacity: 1, rotate: 0 }}
									exit={{ opacity: 0, rotate: -90 }}
									transition={{ duration: 0.2 }}
								>
									<Menu className="w-5 h-5" />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>

					<AnimatePresence>
						<MobileMenu
							isOpen={mobileDrawerOpen}
							navItems={navItems}
							onClose={() => setMobileDrawerOpen(false)}
						/>
					</AnimatePresence>
				</div>
			</div>
		</motion.nav>
	);
};

export default Navbar;
