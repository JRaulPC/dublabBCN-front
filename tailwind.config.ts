const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        favorit: ["var(--font-favorit)", "system-ui"],
      },
      visibility: ["group-hover"],
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      height: {
        small: "225px",
        medium: "335px",
        large: "385px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("tailwind-scrollbar-hide"),
  ],
};

module.exports = config;
