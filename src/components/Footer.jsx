import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
	solutions: [
		{ text: "Car Insurance", href: "#car" },
		{ text: "Home Insurance", href: "#home" },
		{ text: "Life Insurance", href: "#life" },
		{ text: "Business Cover", href: "#business" },
		{ text: "Medical Aid", href: "#medical" },
	],
	company: [
		{ text: "About Us", href: "#about" },
		{ text: "Our Team", href: "#team" },
		{ text: "Careers", href: "#careers" },
		{ text: "Contact", href: "#contact" },
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
		<footer className="bg-gray-900 text-gray-300">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div>
						<h3 className="text-white text-lg font-semibold mb-4">
							Contact Us
						</h3>
						<ul className="space-y-3">
							<li className="flex items-center gap-3">
								<Phone className="w-5 h-5 text-blue-400" />
								<span>0800 123 456</span>
							</li>
							<li className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-blue-400" />
								<span>info@yourbroker.co.za</span>
							</li>
							<li className="flex items-center gap-3">
								<MapPin className="w-5 h-5 text-blue-400" />
								<span>Johannesburg, South Africa</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-white text-lg font-semibold mb-4">Solutions</h3>
						<ul className="space-y-2">
							{footerLinks.solutions.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="hover:text-blue-400 transition-colors"
									>
										{link.text}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-white text-lg font-semibold mb-4">Company</h3>
						<ul className="space-y-2">
							{footerLinks.company.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="hover:text-blue-400 transition-colors"
									>
										{link.text}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
						<ul className="space-y-2">
							{footerLinks.legal.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="hover:text-blue-400 transition-colors"
									>
										{link.text}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-gray-400">
						© 2024 Your Insurance Broker. FSP Number: 12345. All rights
						reserved.
					</p>
					<div className="flex gap-4">
						<Facebook className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
						<Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
						<Linkedin className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
