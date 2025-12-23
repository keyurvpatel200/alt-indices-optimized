module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        light: "#fff",
        "light-darken": "#f7f7f7",
        primary: "var(--primary-color)",
      },
    },
    keyframes: {
      "fade-in": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      spin: {
        from: { rotate: "0deg" },
        to: { rotate: "360deg" },
      }
    },
    animation: {
      "fade-in": "fade-in 0.3s forwards",
      "spin": "spin 1s linear infinite",
    },
  },
  plugins: [],
};