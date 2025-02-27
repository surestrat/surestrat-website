import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
	solutions: [
		{ text: "Car Insurance", href: "#car" },
		{ text: "Home Insurance", href: "#home" },
		{ text: "Life Insurance", href: "#life" },
		{ text: "Business Cover", href: "#business" },
	],
	company: [
		{ text: "About Us", href: "#about" },
		{ text: "Our Team", href: "#team" },
		{ text: "Careers", href: "#careers" },
		{ text: "Contact", href: "/contact" },
	],
	legal: [
		{ text: "Privacy Policy", href: "#privacy" },
		{ text: "Terms of Service", href: "#terms" },
		{ text: "FSCA Disclosures", href: "#fsca" },
		{ text: "Complaints", href: "#complaints" },
	],
};

const Footer = () => {
	return (
		<footer className="text-gray-300 bg-gray-900" id="footer">
			<div className="px-6 py-12 mx-auto max-w-7xl lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">
							Contact Us
						</h3>
						<ul className="space-y-3">
							<li className="flex items-center gap-3">
								<Phone className="w-5 h-5 text-blue-400" />
								<span>087 7164 0095</span>
							</li>
							<li className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-blue-400" />
								<span>info@surestrat.co.za</span>
							</li>
							<li className="flex items-center gap-3">
								<MapPin className="w-5 h-5 text-blue-400" />
								<span>Johannesburg, South Africa</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">Solutions</h3>
						<ul className="space-y-2">
							{footerLinks.solutions.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="transition-colors hover:text-blue-400"
									>
										{link.text}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
						<ul className="space-y-2">
							{footerLinks.company.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="transition-colors hover:text-blue-400"
									>
										{link.text}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">Legal</h3>
						<ul className="space-y-2">
							{footerLinks.legal.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="transition-colors hover:text-blue-400"
									>
										{link.text}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t border-gray-800 md:flex-row">
					<p className="text-sm text-gray-400">
						© 2025 Surestrat (PTY) LTD. FSP Number: 48467. All rights reserved.
					</p>
					<div className="flex gap-4">
						<Facebook className="w-5 h-5 transition-colors cursor-pointer hover:text-blue-400" />
						<Twitter className="w-5 h-5 transition-colors cursor-pointer hover:text-blue-400" />
						<Linkedin className="w-5 h-5 transition-colors cursor-pointer hover:text-blue-400" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
