/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      "ghost-white": "#F6F8FA",
      "slate-gray": "#7C90A0",
      "paynes-gray": "#3E6680",
      "dark-gray": "#121E26",
      "dark-gray-faded": "#121e26bf",
      "card-border": "#E9EDF0",
      "input-border": "#D5DDE3",
    },
    fontFamily: {
      sans: ["Heebo", "sans-serif"],
    },
    fontSize: {
      h1: "1.875rem",
      h2: "1.5rem",
      h3: "1.125rem",
      h4: "1rem",
      body: "1rem",
      label: "0.75rem",
      button: "0.875rem",
    },
    boxShadow: {
      card: "2px 0px 15px 5px rgb(18, 30, 38, 0.03)",
      switcher: "0px 0px 8px 2px rgb(18, 30, 38, 0.08)",
    },
    borderRadius: {
      2: "2px",
      full: "100%",
    },
    keyframes: {
      slideUpAndFade: {
        from: { opacity: 0, transform: "translateY(-4px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
      },
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
    },
    animation: {
      slideUpAndFade: "slideUpAndFade .2s cubic-bezier(0.16, 1, 0.3, 1)",
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
    contentShow: {
      from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
      to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
    },
  },
  animation: {
    slideUpAndFade: "slideUpAndFade .2s cubic-bezier(0.16, 1, 0.3, 1)",
    overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
  plugins: [],
};
