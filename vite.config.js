import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import path from "path";

export default defineConfig({
    plugins: [
        // ✅ Laravel plugin handles manifest & Blade integration
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
            buildDirectory: "build", // 👈 ensures Laravel looks in /public/build
        }),

        // ✅ React plugin for hot reload & JSX support
        react({
            fastRefresh: true,
            include: ["**/*.{js,jsx,ts,tsx}"],
        }),
    ],

    // ✅ Local dev server config
    server: {
        host: "127.0.0.1",
        port: 5174,
        strictPort: true,
        cors: true,
        origin: "http://127.0.0.1:5174",
        hmr: {
            host: "127.0.0.1",
            protocol: "ws",
        },

        proxy: {
            "^/(api|sanctum|login|logout|register)": {
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
                secure: false,
            },
        },
    },

    // ✅ Avoid the “publicDir overlap” warning
    publicDir: false,

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
            "@components": path.resolve(__dirname, "resources/js/components"),
            "@pages": path.resolve(__dirname, "resources/js/pages"),
            "@utils": path.resolve(__dirname, "resources/js/utils"),
            "@api": path.resolve(__dirname, "resources/js/api"),
            "@styles": path.resolve(__dirname, "resources/css"),
        },
    },

    // ✅ Production build output — required for Laravel to locate manifest.json
    build: {
        outDir: "public/build", // 👈 Laravel expects /public/build
        assetsDir: "assets",
        emptyOutDir: true,
        manifest: true,
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                    router: ["react-router-dom"],
                    ui: [
                        "lucide-react",
                        "@radix-ui/react-dialog",
                        "@radix-ui/react-select",
                        "@radix-ui/react-separator",
                        "@radix-ui/react-slot",
                    ],
                },
            },
        },
        chunkSizeWarningLimit: 1200,
    },

    css: {
        devSourcemap: true,
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/variables.scss";`,
            },
        },
    },

    define: {
        __APP_ENV__: JSON.stringify(process.env.NODE_ENV || "development"),
    },

    optimizeDeps: {
        include: [
            "react",
            "react-dom",
            "react-router-dom",
            "lucide-react",
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
        ],
    },
});
