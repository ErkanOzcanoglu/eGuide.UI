/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#030712",
        secondary: "#282A3A",
        accent: "#735F32",
        text: "#ffffff",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [require("daisyui")],
};
