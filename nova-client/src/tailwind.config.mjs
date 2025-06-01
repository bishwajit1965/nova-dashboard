export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ✅
  // prefix: "", // ✅ no prefix
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        border: "var(--color-border)",
        padding: "var(--div-padding)",
      },
    },
  },
  plugins: [require("daisyui")], // if using DaisyUI
};
