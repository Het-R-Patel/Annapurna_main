/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        backgroundcolor:"#205781",
        textcolor: "#E2E8F0",
        navbarbg: "#4F959D",
        bordercolor: "#98D2C0",
        textmuted: "#94A3B8",
        buttonbg: "#475569",
        togglebg:"#64748B",
        togglecircle: "#FFFFFF",
        datelink: "#6941C6",
        cardbg: "#F6F8D5",
      },
    },
  },
  plugins: [],
};
