import Logo from "@assets/images/surestrat-logo.png";
import CarIns from "@assets/images/car-ins.jpg";
import HomeIns from "@assets/images/home-ins.jpg";
import LifeIns from "@assets/images/life-ins4.jpg";
import MedicalAidIns from "@assets/images/medical-aid-ins.jpg";
import BusinessProtectionIns from "@assets/images/business-protection-ins.jpg";
import GroupBenefitsIns from "@assets/images/group-benefits-ins.jpg";

import {
	Building2,
	Car,
	Heart,
	Shield,
	Briefcase,
	Users,
	FileCheck,
	Clock,
	Phone,
	CheckCircle2,
	Scale,
	BookOpen,
	Building,
	Umbrella,
	Trophy,
	MapPin,
	Star,
} from "lucide-react";

import MiwayLogo from "@assets/images/miway-ins-logo.png";
import PineappleLogo from "@assets/images/pineapple-ins-logo.png";
import AbsaLogo from "@assets/images/absa-ins-logo.png";
// import AutoGenLogo from "@assets/images/autogeneral-ins-logo.jpg";
import BudgetLogo from "@assets/images/budget-ins-logo.png";
// import FfwLogo from "@assets/images/1st-for-women-ins-logo.png";
// import KingPLogo from "@assets/images/KingPrice-ins-logo.png";

export const navLogo = [
	{
		icon: Logo,
		name: "SureStrat",
		iconNameSub: "Insurance Brokers",
		alt: "Surestrat Insurance brokers logo",
		className: "w-full h-full object-contain relative z-10",
	},
];

export const navItems = [
	{
		id: 1,
		label: "Solutions",
		href: "#solutions",
		isNew: true,
	},
	{
		id: 2,
		label: "Claims",
		href: "#claims",
	},
	{
		id: 3,
		label: "About",
		href: "#about",
	},
	{
		id: 4,
		label: "Resources",
		href: "#resources",
		badge: "Updates",
	},
];

export const navCTA = [
	{
		id: 1,
		label: "0871640095",
		href: "tel:+27871640095",
	},
	{
		id: 2,
		label: "Claims Portal",
		href: "/claims-portal",
	},
	{
		id: 3,
		label: "Get Quote",
		href: "/quote-form",
	},
];

export const insuranceProducts = [
	{
		icon: <Car className="w-6 h-6" />,
		title: "Motor Vehicle Cover",
		description:
			"Comprehensive & third party cover from top SA insurers like Santam, Discovery Insure & OUTsurance.",
		image: CarIns,
		color: "from-blue-500 to-blue-600",
		link: "/car-insurance",
	},
	{
		icon: <Building2 className="w-6 h-6" />,
		title: "Buildings & Contents",
		description:
			"Complete home protection including thatch risk, security & natural disasters for SA homeowners.",
		image: HomeIns,
		color: "from-indigo-500 to-indigo-600",
		link: "/home-insurance",
	},
	{
		icon: <Heart className="w-6 h-6" />,
		title: "Life & Funeral Plans",
		description:
			"Affordable funeral plans and life coverage from Old Mutual, Sanlam and other trusted SA providers.",
		image: LifeIns,
		color: "from-purple-500 to-purple-600",
		link: "/life-insurance",
	},
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Medical Aid Schemes",
		description:
			"Leading medical schemes including Discovery Health, Momentum & Bonitas with gap cover options.",
		image: MedicalAidIns,
		color: "from-cyan-500 to-cyan-600",
		link: "/medical-aid",
	},
	{
		icon: <Briefcase className="w-6 h-6" />,
		title: "Business Protection",
		description:
			"BEE-compliant business insurance solutions including asset, fleet & liability coverage.",
		image: BusinessProtectionIns,
		color: "from-teal-500 to-teal-600",
		link: "/business-insurance",
	},
	{
		icon: <Users className="w-6 h-6" />,
		title: "Group Benefits",
		description:
			"Employee benefits, group life & pension schemes for South African businesses.",
		image: GroupBenefitsIns,
		color: "from-sky-500 to-sky-600",
	},
];
export const aboutStats = [
	{
		number: "10+",
		label: "Years Experience",
		color: "from-blue-500 to-blue-700",
		bgColor: "bg-blue-50",
		icon: <Trophy className="w-5 h-5 text-blue-500 sm:w-6 sm:h-6" />,
	},
	{
		number: "50K+",
		label: "Satisfied Clients",
		color: "from-indigo-500 to-indigo-700",
		bgColor: "bg-indigo-50",
		icon: <Users className="w-5 h-5 text-indigo-500 sm:w-6 sm:h-6" />,
	},
	{
		number: "R500M+",
		label: "Claims Processed",
		color: "from-purple-500 to-purple-700",
		bgColor: "bg-purple-50",
		icon: <CheckCircle2 className="w-5 h-5 text-purple-500 sm:w-6 sm:h-6" />,
	},
	{
		number: "9",
		label: "SA Provinces Covered",
		color: "from-cyan-500 to-cyan-700",
		bgColor: "bg-cyan-50",
		icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />,
	},
];
export const aboutValues = [
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Trust & Integrity",
		description:
			"FSCA registered broker committed to ethical insurance practices.",
		color: "from-blue-500 to-blue-600",
		highlight: "FSCA Registered",
	},
	{
		icon: <Heart className="w-6 h-6" />,
		title: "Client-First Approach",
		description:
			"Dedicated to providing personalized insurance solutions for every client.",
		color: "from-indigo-500 to-indigo-600",
		highlight: "Personalized Care",
	},
	{
		icon: <Star className="w-6 h-6" />,
		title: "Excellence",
		description:
			"Committed to delivering the highest quality service and support.",
		color: "from-purple-500 to-purple-600",
		highlight: "Top Rated",
	},
	{
		icon: <CheckCircle2 className="w-6 h-6" />,
		title: "Reliability",
		description: "24/7 support and fast claims processing for peace of mind.",
		color: "from-cyan-500 to-cyan-600",
		highlight: "Always Available",
	},
];

export const claimsSteps = [
	{
		icon: <Phone className="w-6 h-6" />,
		title: "Contact Us",
		description:
			"Call our dedicated SA support line or WhatsApp us to report your claim.",
	},
	{
		icon: <FileCheck className="w-6 h-6" />,
		title: "Broker Assistance",
		description:
			"Your personal broker will guide you through the claims process with your insurer.",
	},
	{
		icon: <Clock className="w-6 h-6" />,
		title: "Claims Management",
		description:
			"We liaise with insurers on your behalf to expedite your claim.",
	},
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Resolution",
		description:
			"We ensure fair settlement and keep you updated throughout the process.",
	},
];

export const complianceItems = [
	{
		icon: <Shield className="w-6 h-6" />,
		title: "FSCA Registered",
		description:
			"Licensed Financial Services Provider (FSP) regulated by the Financial Sector Conduct Authority",
	},
	{
		icon: <Scale className="w-6 h-6" />,
		title: "FAIS Compliant",
		description:
			"Fully compliant with the Financial Advisory and Intermediary Services Act",
	},
	{
		icon: <BookOpen className="w-6 h-6" />,
		title: "Professional Insurance",
		description:
			"Comprehensive professional indemnity and fidelity insurance coverage",
	},
	{
		icon: <CheckCircle2 className="w-6 h-6" />,
		title: "Industry Standards",
		description: "Adherence to industry best practices and ethical standards",
	},
];

export const heroFeatures = [
	{
		icon: <Building className="w-6 h-6" />,
		title: "Property Insurance",
		description: "Protect your assets with comprehensive building coverage",
		color: "from-blue-500 to-blue-600",
	},
	{
		icon: <Car className="w-6 h-6" />,
		title: "Auto Insurance",
		description: "Full vehicle protection from trusted SA insurers",
		color: "from-indigo-500 to-indigo-600",
	},
	{
		icon: <Heart className="w-6 h-6" />,
		title: "Life Insurance",
		description: "Secure your family's financial future",
		color: "from-purple-500 to-purple-600",
	},
	{
		icon: <Umbrella className="w-6 h-6" />,
		title: "Liability Cover",
		description: "Professional and personal liability protection",
		color: "from-cyan-500 to-cyan-600",
	},
];

export const partnerLogos = [
	{
		name: "Miway Insurance",
		logo: MiwayLogo,
		color: "bg-red-100/50",
		borderColor: "border-red-200",
	},
	{
		name: "Pineapple Insurance",
		logo: PineappleLogo,

		color: "bg-blue-100/50",
		borderColor: "border-blue-200",
	},
	{
		name: "Absa Insurance",
		logo: AbsaLogo,
		color: "bg-green-100/50",
		borderColor: "border-green-200",
	},
	{
		name: "Budget Insurance",
		logo: BudgetLogo,
		color: "bg-purple-100/50",
		borderColor: "border-purple-200",
	},
	// Add more partners as needed
];
export const brokerageServices = [
	{
		title: "Personal Insurance",
		description: "For individuals & families",
		features: [
			"Free consultation & needs analysis",
			"Access to multiple SA insurers",
			"Claims assistance & support",
			"Annual policy review",
			"No direct fees - commission based",
		],
		cta: "Get a Quote",
	},
	{
		title: "Business Insurance",
		description: "For companies & organizations",
		featured: true,
		features: [
			"Comprehensive risk assessment",
			"BEE compliant solutions",
			"Fleet & asset management",
			"24/7 claims support",
			"Dedicated account manager",
		],
		cta: "Book Consultation",
	},
	{
		title: "Specialized Cover",
		description: "For unique requirements",
		features: [
			"Custom insurance solutions",
			"High-value asset protection",
			"Professional liability cover",
			"Industry-specific packages",
			"Direct insurer negotiations",
		],
		cta: "Contact Us",
	},
];
export const testimonials = [
	{
		text: "Their expertise in South African insurance market saved us thousands on our business coverage. Excellent service!",
		user: "David van der Merwe",
		role: "Business Owner",
		company: "Cape Town Logistics",
		rating: 5,
	},
	{
		text: "Quick response on my car insurance claim. They handled everything with the insurers professionally.",
		user: "Sarah Nkosi",
		role: "Client",
		company: "Personal Insurance",
		rating: 5,
	},
	{
		text: "The team helped us find the perfect medical aid for our employees. Their knowledge of SA healthcare is outstanding.",
		user: "Michael Patel",
		role: "HR Director",
		company: "Tech Solutions SA",
		rating: 5,
	},
];
export const surveyJson = {
	elements: [
		{
			name: "FirstName",
			title: "Enter your first name:",
			type: "text",
		},
		{
			name: "LastName",
			title: "Enter your last name:",
			type: "text",
		},
	],
};
export const json = {
	elements: [
		{
			type: "html",
			name: "question1",
			visibleIf:
				"{first-name} notempty and {last-name} notempty and {birthdate} notempty",
			html: '<p style="text-align:center"><b style="font-size:24px">Hello, {full-name}!<br>Your age is {age} years.</b></p>',
		},
		{
			type: "text",
			name: "first-name",
			title: "First name:",
			defaultValue: "John",
		},
		{
			type: "text",
			name: "last-name",
			title: "Last name:",
			defaultValue: "Smith",
		},
		{
			type: "text",
			name: "birthdate",
			title: "Birthdate:",
			inputType: "date",
			defaultValue: "1987-05-21",
		},
	],
	calculatedValues: [
		{
			name: "full-name",
			expression: "{first-name} + ' ' + {last-name}",
		},
		{
			name: "age",
			expression: "age({birthdate})",
		},
	],
	showQuestionNumbers: false,
	questionTitleLocation: "left",
};

export const themeJson = {
	cssVariables: {
		"--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
		"--sjs-general-backcolor-dark": "rgba(248, 248, 248, 1)",
		"--sjs-general-backcolor-dim": "rgba(243, 243, 243, 1)",
		"--sjs-general-backcolor-dim-light": "rgba(249, 249, 249, 1)",
		"--sjs-general-backcolor-dim-dark": "rgba(243, 243, 243, 1)",
		"--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
		"--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.45)",
		"--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)",
		"--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.45)",
		"--sjs-primary-backcolor": "rgba(25, 179, 148, 1)",
		"--sjs-primary-backcolor-light": "rgba(25, 179, 148, 0.1)",
		"--sjs-primary-backcolor-dark": "rgba(20, 164, 139, 1)",
		"--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
		"--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
		"--sjs-base-unit": "8px",
		"--sjs-corner-radius": "4px",
		"--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
		"--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
		"--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
		"--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)",
		"--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)",
		"--sjs-shadow-small": "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
		"--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(0, 0, 0, 0.15)",
		"--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
		"--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.1)",
		"--sjs-shadow-inner": "inset 0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
		"--sjs-shadow-inner-reset": "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.15)",
		"--sjs-border-light": "rgba(0, 0, 0, 0.09)",
		"--sjs-border-default": "rgba(0, 0, 0, 0.16)",
		"--sjs-border-inside": "rgba(0, 0, 0, 0.16)",
		"--sjs-special-red": "rgba(229, 10, 62, 1)",
		"--sjs-special-red-light": "rgba(229, 10, 62, 0.1)",
		"--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)",
		"--sjs-special-green": "rgba(25, 179, 148, 1)",
		"--sjs-special-green-light": "rgba(25, 179, 148, 0.1)",
		"--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)",
		"--sjs-special-blue": "rgba(67, 127, 217, 1)",
		"--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
		"--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
		"--sjs-special-yellow": "rgba(255, 152, 20, 1)",
		"--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
		"--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",
		"--sjs-article-font-xx-large-textDecoration": "none",
		"--sjs-article-font-xx-large-fontWeight": "700",
		"--sjs-article-font-xx-large-fontStyle": "normal",
		"--sjs-article-font-xx-large-fontStretch": "normal",
		"--sjs-article-font-xx-large-letterSpacing": "0",
		"--sjs-article-font-xx-large-lineHeight": "64px",
		"--sjs-article-font-xx-large-paragraphIndent": "0px",
		"--sjs-article-font-xx-large-textCase": "none",
		"--sjs-article-font-x-large-textDecoration": "none",
		"--sjs-article-font-x-large-fontWeight": "700",
		"--sjs-article-font-x-large-fontStyle": "normal",
		"--sjs-article-font-x-large-fontStretch": "normal",
		"--sjs-article-font-x-large-letterSpacing": "0",
		"--sjs-article-font-x-large-lineHeight": "56px",
		"--sjs-article-font-x-large-paragraphIndent": "0px",
		"--sjs-article-font-x-large-textCase": "none",
		"--sjs-article-font-large-textDecoration": "none",
		"--sjs-article-font-large-fontWeight": "700",
		"--sjs-article-font-large-fontStyle": "normal",
		"--sjs-article-font-large-fontStretch": "normal",
		"--sjs-article-font-large-letterSpacing": "0",
		"--sjs-article-font-large-lineHeight": "40px",
		"--sjs-article-font-large-paragraphIndent": "0px",
		"--sjs-article-font-large-textCase": "none",
		"--sjs-article-font-medium-textDecoration": "none",
		"--sjs-article-font-medium-fontWeight": "700",
		"--sjs-article-font-medium-fontStyle": "normal",
		"--sjs-article-font-medium-fontStretch": "normal",
		"--sjs-article-font-medium-letterSpacing": "0",
		"--sjs-article-font-medium-lineHeight": "32px",
		"--sjs-article-font-medium-paragraphIndent": "0px",
		"--sjs-article-font-medium-textCase": "none",
		"--sjs-article-font-default-textDecoration": "none",
		"--sjs-article-font-default-fontWeight": "400",
		"--sjs-article-font-default-fontStyle": "normal",
		"--sjs-article-font-default-fontStretch": "normal",
		"--sjs-article-font-default-letterSpacing": "0",
		"--sjs-article-font-default-lineHeight": "28px",
		"--sjs-article-font-default-paragraphIndent": "0px",
		"--sjs-article-font-default-textCase": "none",
	},
	isPanelless: false,
	themeName: "default",
	colorPalette: "light",
};
