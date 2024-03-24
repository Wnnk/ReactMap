/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-image": "url('../../public/images/home.jpg')",
      },
      keyframes: {
        'nav-in': {
          '0%': {transform: 'translateX(-100%)'},
          '100%': {transform: 'translateX(0%)'},
        },
        'nav-appear': {
          '0%': { opacity: 0, display: 'none' },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        'nav-in': 'nav-in 0.5s ease-in-out forwards',
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
