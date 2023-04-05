/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "scaffoldEthDark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        scaffoldEth: {
          primary: "#2E86AB",
          "primary-content": "#FFFFFF",
          secondary: "#7FB3D5",
          "secondary-content": "#121212",
          accent: "#91bfdb",
          "accent-content": "#121212",
          neutral: "#F9FBFF",
          "neutral-content": "#2E86AB",
          "base-100": "#FFFFFF",
          "base-200": "#F9FBFF",
          "base-300": "#7FB3D5",
          "base-content": "#121212",
          info: "#91bfdb",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
        },
      },
      {
        scaffoldEthDark: {
          primary: "#121212",
          "primary-content": "#F9FBFF",
          secondary: "#191919",
          "secondary-content": "#F9FBFF",
          accent: "#2E86AB",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#2E86AB",
          "base-100": "#003a6d",
          "base-200": "#191919",
          "base-300": "#121212",
          "base-content": "#F9FBFF",
          info: "#2E86AB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--p))",
          },
        },
      },
      {
        exampleUi: {
          primary: "#91bfdb",
          "primary-content": "#121212",
          secondary: "#89bfe0",
          "secondary-content": "#121212",
          accent: "#91bfdb",
          "accent-content": "#121212",
          neutral: "#121212",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#F9FBFF",
          "base-300": "#89bfe0",
          "base-content": "#121212",
          info: "#91bfdb",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
        },
      },
    ],
  },
  theme: {
    // Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
    extend: {
      fontFamily: {
        "bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
      },
      keyframes: {
        grow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.1, 1.1)" },
        },
      },
      animation: {
        grow: "grow 5s linear infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        zoom: "zoom 1s ease infinite",
      },
    },
  },
};
