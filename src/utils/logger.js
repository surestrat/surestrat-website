/**
 * Custom logger utility with different log levels
 */

const isDevEnvironment =
	process.env.NODE_ENV === "development" ||
	window.location.hostname === "localhost";

// Set the log level based on environment
// 0 = none, 1 = error only, 2 = warn+error, 3 = info+warn+error, 4 = all including debug
const LOG_LEVEL = isDevEnvironment ? 4 : 2;

// Custom emoji for each log type
const LOG_TYPES = {
	log: "📝",
	info: "ℹ️",
	debug: "🔍",
	warn: "⚠️",
	error: "❌",
};

// Create logger object with methods for each log type
export const logger = {
	log: (message, ...data) => {
		if (LOG_LEVEL >= 3 && console) {
			console.log(`${LOG_TYPES.log} ${message}`, ...data);
		}
	},

	info: (message, ...data) => {
		if (LOG_LEVEL >= 3 && console) {
			console.info(`${LOG_TYPES.info} ${message}`, ...data);
		}
	},

	debug: (message, ...data) => {
		if (LOG_LEVEL >= 4 && console) {
			console.debug(`${LOG_TYPES.debug} ${message}`, ...data);
		}
	},

	warn: (message, ...data) => {
		if (LOG_LEVEL >= 2 && console) {
			console.warn(`${LOG_TYPES.warn} ${message}`, ...data);
		}
	},

	error: (message, ...data) => {
		if (LOG_LEVEL >= 1 && console) {
			console.error(`${LOG_TYPES.error} ${message}`, ...data);
		}

		// In production, you might want to send this to an error reporting service
		if (!isDevEnvironment) {
			// Example: sendToErrorReportingService(message, ...data);
		}
	},

	// Group related logs
	group: (name, fn) => {
		if (LOG_LEVEL >= 3 && console && console.group) {
			console.group(name);
			fn();
			console.groupEnd();
		} else {
			fn();
		}
	},

	// Measure performance
	time: (label) => {
		if (LOG_LEVEL >= 4 && console && console.time) {
			console.time(label);
		}
	},

	timeEnd: (label) => {
		if (LOG_LEVEL >= 4 && console && console.timeEnd) {
			console.timeEnd(label);
		}
	},

	// Safe logging that won't break if console is unavailable
	// Useful for older browsers or environments where console may be unavailable
	safe: (fn) => {
		try {
			fn();
		} catch (e) {
			// Silent failure if logging fails
		}
	},
};
