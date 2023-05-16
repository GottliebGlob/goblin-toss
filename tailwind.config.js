/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.{js,ts,jsx,tsx}", "./common/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        back: {
          100: "#151b2b",
          200: "#0e151f",
        },
        font: {
          200: "#6872a6",
        },
        accent: {
          100: "#363a46",
          200: "#5d65ed",
        },
      },
      backgroundImage: {
        main: "url('/back.png')",
      },
      dropShadow: {
        gold: ["0 0px 20px #FBC13C"],
        goldStrong: ["0 0px 50px #FBC13C"],
      },
    },
  },
  plugins: [],
};
