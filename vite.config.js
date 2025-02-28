import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],

	build: {
		outDir: "dist",
		assetsDir: "assets",
		emptyOutDir: true,
		rollupOptions: {
			output: {
				manualChunks: undefined,
				format: "iife",
			},
		},
	},

	server: {
		proxy: {
			"/api": {
				target: "https://surestrat.co.za",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
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
