module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      height: {
        '5': "5%",
        '10': "10%",
        '20': "20%",
        '30': "30%",
        '40': "40%",
        '50': "50%",
        '60': "60%",
        '70': "70%",
        '80': "80%",
        '90': "90%"
      }
    },
  },
  plugins: [],
}
