import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],

	build: {
		outDir: "dist",
		assetsDir: "assets",
		emptyOutDir: true,
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom", "react-router-dom"],
					ui: ["framer-motion", "lucide-react"],
				},
			},
		},
	},

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@styles": "/src/styles",
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@context": "/src/context",
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@services": "/src/services",
			"@config": "/src/config",
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@schemas": path.resolve(__dirname, "./src/schemas"),
		},
	},

	server: {
		port: 5173,
		open: true,
		// Proxy API requests to the production server during development
		proxy: {
			"/api": {
				target: "https://surestrat.co.za",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
