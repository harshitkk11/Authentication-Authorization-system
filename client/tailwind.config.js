/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      primary: "#0798ec",
      secondary: "#2fd069",
      "secondary-light": "#6ede97",
      input: "#EDF2FA",
      link: "#007bff",
      error: "#F44336",
      disabled: "#6c757d",
      border: "#e1e1e1",
      "error-background": "#F8D7DA",
    },
    
    extend: {},
  },
  plugins: [],
}

