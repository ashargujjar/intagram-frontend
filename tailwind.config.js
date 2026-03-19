/** @type {import('tailwindcss').Config} */
export default {
  // Make sure your content array points to your React files so Tailwind knows where to look!
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Brand
        brand: {
          DEFAULT: "#1E4F7A",
          dark: "#143A5A",
          accent: "#F2A32C",
        },
        // Backgrounds
        appBg: "#F5F7F9",
        cardBg: "#FFFFFF",
        // Text
        textMain: "#1A1A1A",
        textSec: "#6B7280",
        textMuted: "#9CA3AF",
        // Borders
        uiBorder: "#E3E8EE",
      },
      backgroundImage: {
        // Brand Gradient
        "brand-gradient": "linear-gradient(135deg, #1E4F7A, #F2A32C)",
      },
    },
  },
  plugins: [],
};
