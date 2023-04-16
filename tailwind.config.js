/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/app/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
  extend: {
    colors: {
      'transparent': 'transparent',
      'main-background-color': '#F9F9FB',
      'white': '#ffffff',
      // 'blue': '#2367FF',
      'dark-blue': '#1B4FC4',
      'pastel-red': '#ffb3ba',
      'pastel-orange': '##ffdfba',
      'pastel-yellow': '#ffffba',
      'pastel-green': '#baffc9',
      'pastel-blue': '#bae1ff',
      ...colors,
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
}
export const plugins = []
