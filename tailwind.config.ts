/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app.vue",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
          'fade-in-down': {
              '0%': {
                  opacity: '0',
                  transform: 'translateY(-50px)'
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateY(0)'
              },
          }
      },
      animation: {
          'fade-in-down': 'fade-in-down 1s ease-out forwards'
      }
    },
  },
  variants: {
    extend: {},
    backgroundColor: ["active"],
  },
  plugins: [],
};