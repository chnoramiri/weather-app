import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        title: `2.6rem;`,
        paragraph: `1.2rem;`
      },
      extend: {
        colors: {
          primary: {
            500: '#FF6363;',
            800: '#FF1313;',
          }
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["autumn"],
  },
};
export default config;
