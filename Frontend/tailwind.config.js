/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        nav: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for hover
      },
    },
  },
  plugins: [require("daisyui")],
};
