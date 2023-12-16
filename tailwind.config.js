/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      boxShadow: {
        'normal': '0px 0px 0px',
        'hard': '4px 4px 0px'
      }
    },
  },
  plugins: [],
}

