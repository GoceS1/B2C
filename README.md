# Real Estate Landing Page

A modern, clean landing page for real estate search built with Next.js, Tailwind CSS, and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components inspired by shadcn/ui
- **Typography**: Inter font (optimized with next/font)
- **Icons**: Lucide React
- **Animations**: Framer Motion (ready to use)
- **Language**: TypeScript

## 🎨 Design System

### Colors
- **Primary**: Purple (#6F3FF5)
- **Accent Orange**: #FF6A3D
- **Accent Magenta**: #FF82C6
- **Background**: White (#FFFFFF)
- **Text**: Black (#0F172A) / Gray (#64748B)

### Typography
- **Font**: Inter (system-ui fallback)
- **Style**: Clean, minimal, Notion/Lovable-inspired

## 🛠️ Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with Inter font
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx         # Hero section with search bar
│   └── ui/              # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       └── card.tsx
└── lib/
    └── utils.ts         # Utility functions (cn helper)
```

## ✨ Features

- **Hero Section**: Large, centered hero with gradient text
- **Search Bar**: Interactive search with dropdown results
- **Quick Filters**: Property type filter buttons
- **Stats Section**: Display key metrics
- **Responsive**: Mobile-first design
- **Accessible**: Built with semantic HTML and ARIA labels

## 🎯 Next Steps

- Add more sections (features, testimonials, CTA)
- Integrate real AI search functionality
- Add animations with Framer Motion
- Connect to real estate API
- Add property detail pages

## 📝 License

MIT

