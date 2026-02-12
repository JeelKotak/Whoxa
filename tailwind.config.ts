import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ['Montserrat', 'sans-serif'],
        ibm: ['"IBM Plex Sans"', 'sans-serif'],
        lexend: ['"Lexend Deca"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
