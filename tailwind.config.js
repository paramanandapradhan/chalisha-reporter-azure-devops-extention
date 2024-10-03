/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@cloudparker/moldex.js/**/*.{svelte,js,ts}',
    "./src/app.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode class
  theme: {
    extend: {
      colors: {
        /**
         * Primary color will be used fro highlight colors for both the theme light or dark
         */
        // Blue Color : https://tailwindcss.com/docs/customizing-colors
        primary: {
          'DEFAULT': "#2563eb", // 600

          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554"


        },
        /**
         * Base color used for normal text, bg, border color for both the theme light or dark
         */
        // Slate Color : https://tailwindcss.com/docs/customizing-colors
        base: {
          'DEFAULT': "#475569", // 600
          "50": "#f8fafc",
          "100": "#f1f5f9",
          "200": "#e2e8f0",
          "300": "#cbd5e1",
          "400": "#94a3b8",
          "500": "#64748b",
          "600": "#475569",
          "700": "#334155",
          "800": "#1e293b",
          "900": "#0f172a",
          "950": "#020617"
        }
      }
    },
  },

  plugins: [

  ],
}

