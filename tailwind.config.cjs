/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      tables: "960px",
      desktop: "1248px",
    },
    colors: {
      white: "#FFFFFF",
      "dark-blue": "#171634",
      // blue: "#1E88E5",
      red: "#F44336",
      green: "#4CAF50",
      yellow: "#FFEB3B",
      black: "#000000",
      grey: "#2A2929FF",
      "dark-grey": "#1e293b",
      "cool-red": "#de8a83",
      "cool-green": "#8adec2",
      "slate-800": "#1e293b",
      "slate-700": "#334155",
      sky: colors.sky,
      blue: colors.blue,
    },
    boxShadow: {
      sm: "0, 2px 4px 0px rgba(11.10.55.15)",
      lg: "0, 8px 20px 0px rgba(18, 16, 99, 0.06)",
    },
    fontSize: {
      xs: ["14px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
      sm: ["16px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      lg: ["18px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      "2xl": ["36px", { lineHeight: "48px", letterSpacing: "-0.032em" }],
      "3xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.032em" }],
      "4xl": ["56px", { lineHeight: "64px", letterSpacing: "-0.032em" }],
      "5xl": ["80px", { lineHeight: "80px", letterSpacing: "-0.032em" }],
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      KulimPark: ["Kulim Park", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
  darkMode: "class"
}
