/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // use class "dark" (or data-theme="dark")
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
