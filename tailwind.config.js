/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#080d18",
        panel: "#101827",
        line: "#253247",
        cyan: "#55d6e8",
      },
      boxShadow: {
        glow: "0 0 35px rgba(65, 211, 232, .12)",
      },
    },
  },
  plugins: [],
};
