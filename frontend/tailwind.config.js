/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,tsx,jsx}',
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'ghost-white': '#F6F8FA',
      'slate-gray': '#7C90A0',
      'paynes-gray': '#3E6680',
      'dark-gray': '#121E26',
      'card-border': '#E9EDF0',
      'input-border': '#D5DDE3',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontSize: {
      h1: "1.875rem",
      h2: "1.5rem",
      h3: "1.125rem",
      body: "1rem",
      label: "0.75rem",
    },
    boxShadow: {
      'card': '2px 0px 15px 5px rgb(18, 30, 38, 0.03)',
    },
    borderRadius: {
      2: '2px',
      'full': '100%',
    },
    opacity: {
      '75': '.75',
      '60': '.60',
      '15': '.15',
    },
    keyframes: {
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(-4px)' },
          to: { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade .2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
