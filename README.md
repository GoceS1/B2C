# Keyguidesconnect - Travel Guide Platform

A modern, beautiful platform for connecting travelers with certified local guides across Europe. Built with Next.js, Tailwind CSS, and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components with shadcn/ui patterns
- **Typography**: Inter font (optimized with next/font)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript

## 🎨 Design System

### Brand Colors
- **Primary Pink**: #EBC8EB
- **Secondary Pink**: #DEB8DE
- **Purple**: #9B5CC8, #D3B7FF
- **Background**: White (#FFFFFF)
- **Text**: Black (#0F172A) / Gray (#64748B)

### Typography
- **Font**: Inter (system-ui fallback)
- **Style**: Clean, modern, travel-inspired

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
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero section with AI search bar
│   ├── LogoCarousel.tsx         # Auto-scrolling certification logos
│   ├── GuidesCarousel.tsx       # Featured guides carousel
│   ├── ToursCarousel.tsx        # Popular tours carousel
│   ├── DestinationsCarousel.tsx # Popular countries carousel
│   └── ui/                      # Reusable UI components
│       ├── button.tsx
│       ├── animated-text.tsx
│       └── glow-effect.tsx
└── lib/
    └── utils.ts                 # Utility functions (cn helper)
```

## ✨ Features

### 🎯 Core Features
- **AI-Powered Search**: Interactive search bar that transforms into a chat interface
- **Dynamic Hero**: Animated text switching between "tour" and "guide"
- **Certified Guides**: Logo carousel showcasing tourism association certifications
- **Featured Guides**: Horizontal carousel with guide profiles, pricing, and locations
- **Popular Tours**: Tour listings with signature and association tour types
- **Destinations**: Beautiful country cards with hover effects

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first, works beautifully on all devices
- **Smooth Animations**: Framer Motion for fluid transitions
- **Interactive Carousels**: Horizontal scrolling with navigation arrows
- **Gradient Effects**: Subtle pink/purple gradients on search bar
- **Clean Header**: Minimalist navigation with centered links

### 🎭 Tour Types
- **Signature Tours**: Tours by individual guides with guide avatars
- **Association Tours**: Multi-guide tours with overlapping avatars

## 🎯 Next Steps

- [ ] Integrate real AI search functionality
- [ ] Add guide and tour detail pages
- [ ] Implement booking flow
- [ ] Add user authentication
- [ ] Connect to backend API
- [ ] Add reviews and ratings system
- [ ] Implement search filters
- [ ] Add payment integration

## 📝 License

MIT
