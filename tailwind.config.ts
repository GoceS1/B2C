import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6F3FF5',
          hover: '#5D2FE0',
        },
        accent: {
          orange: '#FF6A3D',
          magenta: '#FF82C6',
        },
        background: '#FFFFFF',
        surface: 'rgba(111, 63, 245, 0.04)',
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6F3FF5 0%, #FF6A3D 60%, #FF82C6 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

