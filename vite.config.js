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
		sourcemap: true,
		minify: true,
		reportCompressedSize: true,
		rollupOptions: {
			output: {
				manualChunks: undefined,
				chunkFileNames: "assets/[name]-[hash].js",
				entryFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
		},
		cssCodeSplit: false,
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
			"@services": path.resolve(__dirname, "./src/services"),
			"@config": "/src/config",
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@schemas": path.resolve(__dirname, "./src/schemas"),
		},
	},

	// Uncomment and use this for local development if needed
	// server: {
	// 	port: 5173,
	// 	open: true,
	// 	cors: true, // Enable CORS for Appwrite
	// 	headers: {
	// 		"X-Frame-Options": "SAMEORIGIN",
	// 		"Referrer-Policy": "strict-origin-when-cross-origin",
	// 		"Permissions-Policy": "interest-cohort=()",
	// 	},
	// },

	base: "./",
});
