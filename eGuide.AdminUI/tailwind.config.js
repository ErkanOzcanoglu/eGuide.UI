/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {},
    theme: {
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
  },
  plugins: [require("daisyui")],
};
