const isProductionLoggingEnabled =
	import.meta.env.VITE_ENABLE_PRODUCTION_LOGS === "true";
const isProd = import.meta.env.PROD;

export const logger = {
	log: (...args) => {
		if (!isProd || isProductionLoggingEnabled) {
			console.log(...args);
		}
	},
	error: (...args) => {
		if (!isProd || isProductionLoggingEnabled) {
			console.error(...args);
		}
	},
	warn: (...args) => {
		if (!isProd || isProductionLoggingEnabled) {
			console.warn(...args);
		}
	},
	info: (...args) => {
		if (!isProd || isProductionLoggingEnabled) {
			console.info(...args);
		}
	},
	debug: (...args) => {
		if (!isProd || isProductionLoggingEnabled) {
			console.debug(...args);
		}
	},
};
