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
		sourcemap: false, // Disable sourcemaps in production
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom", "react-router-dom"],
					ui: ["framer-motion", "lucide-react"],
				},
			},
		},
		// 	minify: {
		// 		terserOptions: {
		// 			compress: {
		// 				// Keep console logs even in production
		// 				drop_console: false,
		// 				pure_funcs: [],
		// 			},
		// 		},
		// 	},
	},

	// server: {
	// 	proxy: {
	// 		"/api": {
	// 			target: "https://surestrat.co.za",
	// 			changeOrigin: true,
	// 			rewrite: (path) => path.replace(/^\/api/, ""),
	// 		},
	// 	},
	// },
	// server: {
	// 	proxy: {
	// 		"/api": {
	// 			target: process.env.VITE_API_URL,
	// 			changeOrigin: true,
	// 			secure: false,
	// 		},
	// 	},
	// },
	server: {
		port: 5173,
		proxy: {
			"/api": {
				target: "http://localhost:5173",
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
			"@schemas": "/src/schemas",
		},
	},
});
