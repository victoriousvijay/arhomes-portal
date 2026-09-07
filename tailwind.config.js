/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emarat: {
          green: "#01472E",
          greenLight: "#0B5B3E",
          greenDark: "#013824",
          greenDeep: "#002719",
          cream: "#F6F3EC",
          creamLight: "#FAF8F4",
          creamDark: "#ECE7DC",
          gold: "#D4AF37",
          goldLight: "#E5C86C",
          goldHover: "#C49E26",
          darkText: "#18261F",
          muted: "#5A6E64",
          border: "#205843",
          creamBorder: "#E2DDD2"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
