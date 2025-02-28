import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],

	build: {
		target: ["es2015", "chrome63"],
		polyfillDynamicImport: true,
		outDir: "dist",
		rollupOIptions: {
			output: {
				format: "iife",
			},
		},
	},

	resolve: {
		alias: {
			"@": "/src",
			"@components": "/src/components",
			"@styles": "/src/styles",
			"@pages": "/src/pages",
			"@utils": "/src/utils",
			"@hooks": "/src/hooks",
			"@context": "/src/context",
			"@assets": "/src/assets",
			"@services": "/src/services",
			"@config": "/src/config",
			"@constants": "/src/constants",
		},
	},
});
