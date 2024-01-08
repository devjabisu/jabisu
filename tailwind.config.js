/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        15: "repeat(15, minmax(0, 1fr))",
      },
      aspectRatio: {
        "16/10": "16 / 10",
      },
      colors: {
        "indigo-blue": "#3f51b5",
        "warm-beige": "#f5f5dc",
        "dusty-rose": "#e4d8b6",
        "fresh-sage": "#8b9467",
        "soft-gray": "#e5e5ea",
        cream: "rgba(255, 245, 153, 0.15)",
        "light-white": "rgba(255, 255, 255, 0.2)",
      },
      gridTemplateColumns: {
        sidebar: "300px auto",
        "sidebar-collapsed": "60px auto",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
