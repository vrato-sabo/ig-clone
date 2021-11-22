module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xxs: '320px',
        xs: '400px',
        smd: '700px',
        xxl: '1800px',
      },
      width: {
        350: '350px',
      },
      height: {
        60: '60px',
        968: '800px',
        '78vh': '78vh',
        '80vh': '80vh',
        '83vh': '83vh',
        '90vh': '90vh',
      },
      inset: {
        900: '900px',
      },
      borderWidth: {
        0.5: '0.5px',
      },
      padding: {
        0.3: '0.3rem',
      },
      maxWidth: {
        xxs: '15rem',
        '10rem': '10rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
};
