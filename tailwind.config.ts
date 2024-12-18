import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red100: "#FFDFF7",
        pink: "#FBBFEC",
        lightPurple: "#A588FF",
        orange: "#FA5D00",
        orange300: "#FFA06C",
        purple300: "#A588FF",
        blackBg: "#1E1E1E5C",
        blackBg2: "#141414",
        whiteBg: "#F8F8F8",
        gray500: "#D2D2D2",
        gray600: "#696969",
        gray700: "#434343",
        gray800: "#43434380",
      },
    },
  },
  plugins: [],
};
export default config;
