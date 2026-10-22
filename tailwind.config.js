/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1e40af',
        'brand-light': '#3b82f6',
        'brand-dark': '#1e3a8a',
        ink: '#0f172a',
        navy: '#0b1b36',
        'navy-soft': '#13284d',
        surface: '#f5f7fa',
        line: '#e2e8f0',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}