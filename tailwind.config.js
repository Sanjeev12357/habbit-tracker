/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          light: '#A78BFA',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        background: {
          light: '#F9FAFB',
          dark: '#0F172A',
          card: {
            light: '#FFFFFF',
            dark: '#1E293B',
          }
        },
        dark: {
          DEFAULT: '#1E293B',
          light: '#334155',
          lighter: '#475569',
        },
        light: {
          DEFAULT: '#F9FAFB',
          dark: '#E5E7EB',
          darker: '#D1D5DB',
        },
        dailydev: {
          blue: '#3B49DF',
          green: '#27AB83',
          purple: '#8553F4',
          yellow: '#F4C150',
          red: '#F45150',
          navy: '#151E2E',
          darkBlue: '#192233',
          darkCard: '#1E293B',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'soft-dark': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'soft-xl-dark': '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
} 