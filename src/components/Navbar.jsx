import { Menu, X, PhoneCall, Shield, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import SurestratLogo from "/surestrat-logo.png";
import Logo from "@components/ui/Logo";

const navItems = [
	{
		label: "Solutions",
		href: "#features",
		isNew: true,
	},
	{
		label: "Claims",
		href: "#claims",
	},
	{
		label: "About",
		href: "#about",
	},
	{
		label: "Services",
		href: "#pricing",
		badge: "Updates",
	},
];

const Navbar = () => {
	const location = useLocation();
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
			<div className="container px-4 mx-auto xs:px-6">
				<div className="flex items-center justify-between h-14 xs:h-16 sm:h-20">
					{/* Logo with Link */}
					<Link to="/">
						<Logo
							src={SurestratLogo}
							alt="SureStrat Insurance Brokers"
							heading="SureStrat"
							subheading="Insurance Consultants"
						/>
					</Link>

					{/* Desktop Nav */}
					<div className="items-center justify-between flex-1 hidden ml-8 lg:flex">
						<ul className="flex items-center space-x-6 xl:space-x-10">
							{navItems.map((item, index) => (
								<motion.li
									key={index}
									whileHover={{ scale: 1.05 }}
									transition={{ type: "spring", stiffness: 400, damping: 10 }}
									className="relative flex items-center"
								>
									<a
										href={item.href}
										className={`relative py-2 text-sm transition-colors xl:text-base group
                      ${
												location.pathname === item.to
													? "text-blue-600"
													: "text-gray-600 hover:text-blue-600"
											}`}
									>
										<span className="relative inline-flex items-center gap-2">
											{item.label}
											{item.isNew && (
												<span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-medium">
													New
												</span>
											)}
											{item.badge && (
												<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-medium">
													{item.badge}
												</span>
											)}
										</span>
										<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
									</a>
								</motion.li>
							))}
						</ul>

						{/* CTA Buttons */}
						<div className="flex items-center gap-3 xl:gap-4">
							<motion.a
								whileHover={{ scale: 1.05 }}
								href="tel:+27871640095"
								className="flex items-center text-sm text-gray-600 transition-colors xl:text-base hover:text-blue-600 whitespace-nowrap"
							>
								<PhoneCall className="flex-shrink-0 w-4 h-4 mr-2 text-blue-600" />
								<span className="hidden xl:inline">087 1640 095</span>
								<span className="xl:hidden">Call</span>
							</motion.a>

							<Link
								to="/claims-portal"
								className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 transition-colors border border-blue-600 rounded-full xl:px-4 xl:text-base hover:bg-blue-50 whitespace-nowrap group"
							>
								<span>Claims Portal</span>
								<ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
							</Link>

							<Link
								to="/get-quote"
								className="relative px-3 py-2 overflow-hidden text-sm text-white transition-all duration-300 rounded-full shadow-lg xl:px-4 xl:text-base whitespace-nowrap group"
							>
								<span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:scale-105" />
								<span className="relative flex items-center gap-2">
									<span>Get Quote</span>
									<Shield className="flex-shrink-0 w-4 h-4" />
								</span>
							</Link>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<motion.button
						whileTap={{ scale: 0.95 }}
						onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
						className="p-2 rounded-full lg:hidden hover:bg-gray-100"
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

					{/* Mobile Menu */}
					<AnimatePresence>
						{mobileDrawerOpen && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className="lg:hidden fixed left-0 right-0 top-[56px] xs:top-[64px] sm:top-[80px] bg-white/80 backdrop-blur-lg border-b border-neutral-200 shadow-lg"
							>
								<div className="container py-4 mx-auto">
									<ul className="space-y-2">
										{navItems.map((item, index) => (
											<motion.li
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
											>
												<a
													href={item.href}
													className={`flex items-center justify-between py-2.5 px-4 text-base transition-colors rounded-lg
                            ${
															location.pathname === item.href
																? "text-blue-600 bg-blue-50"
																: "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
														}`}
													onClick={() => setMobileDrawerOpen(false)}
												>
													<span>{item.label}</span>
													{(item.isNew || item.badge) && (
														<span
															className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
																item.isNew
																	? "bg-red-500 text-white"
																	: "bg-blue-100 text-blue-600"
															}`}
														>
															{item.isNew ? "New" : item.badge}
														</span>
													)}
												</a>
											</motion.li>
										))}
									</ul>

									<div className="flex flex-col gap-2 px-4 mt-4">
										<a
											href="tel:+27871640095"
											className="flex items-center justify-center py-2 text-base text-gray-600 group"
										>
											<PhoneCall className="w-5 h-5 mr-2 text-blue-600 transition-transform group-hover:rotate-12" />
											<span>087 1640 095</span>
										</a>

										<Link
											to="/claims-portal"
											className="flex items-center justify-center gap-2 py-2.5 px-4 text-base text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors group"
											onClick={() => setMobileDrawerOpen(false)}
										>
											Claims Portal
											<ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
										</Link>

										<Link
											to="/get-quote"
											className="relative py-2.5 px-4 text-base text-center text-white rounded-full transition-all duration-300 overflow-hidden shadow-lg group"
											onClick={() => setMobileDrawerOpen(false)}
										>
											<span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:scale-105" />
											<span className="relative flex items-center justify-center gap-2">
												Get Insurance Quote
												<Shield className="w-4 h-4" />
											</span>
										</Link>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.nav>
	);
};

export default Navbar;
