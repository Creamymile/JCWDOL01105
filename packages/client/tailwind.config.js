/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      color: {
        primary: '#eeeeee',
        accent: '#703eb0',
        secondary: '#0000',
        dark: '#000',
        neutral: '#a4a6a5',
        pallete1: '#4a785e',
        pallete2: '#fefae1',
        pallete3: '#b4daa7',
        pallete4: '#385E72',
      },
    },
  },

  plugins: [],
};
