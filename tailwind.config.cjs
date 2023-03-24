/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        code: {
          text: '#e1e4e8',
          surface: '#2b3036',
          title: '#1f2428',
        },
      },
    },
  },
  plugins: [],
};
