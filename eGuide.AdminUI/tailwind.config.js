/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
