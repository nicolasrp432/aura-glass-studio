import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { buildCspValue } from "./src/config/security";

/**
 * Inyecta la CSP como <meta http-equiv> únicamente en la build de producción.
 * En desarrollo se omite porque el HMR de Vite necesita scripts en línea.
 */
const cspPlugin = (): Plugin => ({
  name: "inject-csp-meta",
  apply: "build",
  transformIndexHtml(html) {
    return {
      html,
      tags: [
        {
          tag: "meta",
          attrs: {
            "http-equiv": "Content-Security-Policy",
            content: buildCspValue(),
          },
          injectTo: "head-prepend",
        },
      ],
    };
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), cspPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
