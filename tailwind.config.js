/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f4511e",
        secondary: "#007BFF",
        danger: "#FF3B30",
        success: "#28A745",
        warning: "#FFC107",
        "light-text": "#11181C",
        "light-background": "#fff",
        "light-tint": "#0a7ea4",
        "light-icon": "#687076",
        "dark-text": "#ECEDEE",
        "dark-background": "#151718",
        "dark-tint": "#fff",
        "dark-icon": "#9BA1A6"
      },
      fontFamily: {
        "space-mono": ["SpaceMono-Regular"]
      }
    }
  },
  plugins: []
}
