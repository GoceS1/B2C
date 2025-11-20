# Keyguidesconnect - Developer Implementation Guide

This is a coded demo/design system for the Keyguidesconnect travel guide platform. This document explains the main components, their structure, and how to implement them on your production site.

## 📁 Main Components & Locations

### Core Components Structure

```
components/
├── Header.tsx                 # Navigation header (clean white design)
├── Hero.tsx                   # Hero section with AI search bar
├── LogoCarousel.tsx          # Auto-scrolling association logos
├── GuidesCarousel.tsx         # Featured guides horizontal carousel
├── ToursCarousel.tsx         # Popular tours horizontal carousel
├── DestinationsCarousel.tsx   # Popular countries horizontal carousel
└── ui/                        # Reusable UI components
    ├── button.tsx
    ├── animated-text.tsx
    └── glow-effect.tsx
```

---

## 🎯 Critical Components (Use As-Is)

These three carousel components are **production-ready** and should be implemented exactly as they are:

### 1. **GuidesCarousel** (`components/GuidesCarousel.tsx`)

**Purpose**: Displays featured guide profiles in a horizontal scrolling carousel.

**Key Features**:
- Horizontal scrolling with navigation arrows (pink circular buttons)
- Airbnb-style card design: floating image with details below
- Shows guide name, location, and pricing
- Price format: "From €X per person"
- Responsive design with hidden scrollbar

**Data Structure**:
```typescript
{
  id: number;
  name: string;
  location: string;
  image: string;        // Guide profile image URL
  price: number;        // Price in euros
}
```

**Implementation Notes**:
- Cards are 288px wide (`w-72`)
- Aspect ratio 3:4 for images
- Smooth scroll with 300px increments
- Arrows appear/disappear based on scroll position

---

### 2. **ToursCarousel** (`components/ToursCarousel.tsx`)

**Purpose**: Displays popular tours in a horizontal scrolling carousel.

**Key Features**:
- Same horizontal scrolling pattern as GuidesCarousel
- Two tour types:
  - **Signature Tours**: Single guide with avatar and name
  - **Association Tours**: Multiple guides with overlapping avatars
- Price display with "per person" or "per group" labels
- Shows tour title, location, price, and guide information

**Data Structure**:
```typescript
{
  id: number;
  title: string;
  location: string;
  image: string;              // Tour image URL
  price: number;
  priceType: "per person" | "per group";
  type: "signature" | "association";
  // For signature tours:
  guide?: {
    name: string;
    avatar: string;
  };
  // For association tours:
  guides?: Array<{
    name: string;
    avatar: string;
  }>;
}
```

**Implementation Notes**:
- Same card dimensions and styling as GuidesCarousel
- Signature tours show single guide avatar (6x6) with name
- Association tours show 3 overlapping avatars (6x6 each) with guide count
- Price is bold black text

---

### 3. **DestinationsCarousel** (`components/DestinationsCarousel.tsx`)

**Purpose**: Displays popular countries/destinations in a horizontal scrolling carousel.

**Key Features**:
- Large country cards with full-bleed images
- Dark gradient overlay at bottom for text legibility
- Country name displayed at bottom
- Hover effects with image scale

**Data Structure**:
```typescript
{
  id: number;
  name: string;              // Country name
  image: string;              // Country/destination image URL
}
```

**Implementation Notes**:
- Cards are 288px wide, 384px tall (`w-72 h-96`)
- Images use `object-cover` to fill the card
- Gradient overlay: `from-black/80 via-black/20 to-transparent`
- Text is white, bold, positioned at bottom

---

## 🎨 Logo Carousel (`components/LogoCarousel.tsx`)

**Purpose**: Auto-scrolling carousel of tourism association certification logos.

**Current Implementation**:
- Infinite auto-scroll animation (20s duration)
- Logos displayed in white cards with subtle shadows
- Fade effect on left/right edges
- Currently shows: TripAdvisor, Booking.com, Expedia, Airbnb, Viator, GetYourGuide

**⚠️ Required Changes for Production**:

1. **Make logos clickable**: Each logo should link to the association's page
   ```tsx
   // Update the logo structure:
   const logos = [
     { 
       name: "TripAdvisor", 
       url: "...", 
       link: "https://tripadvisor.com/..."  // Add this
     },
     // ... other logos
   ];
   
   // Wrap in anchor tag:
   <a href={logo.link} target="_blank" rel="noopener noreferrer">
     <div className="...">
       <img src={logo.url} ... />
     </div>
   </a>
   ```

2. **Update logo data**: Replace with your actual certification/association logos and their URLs

**Location**: Rendered in `Hero.tsx` below the search bar

---

## 🔍 AI Search Bar (`components/Hero.tsx`)

**Purpose**: Interactive search bar that transforms into a chat interface.

**Key Features**:

1. **Gradient Glow Effect**:
   - Multi-layer pink/purple gradient border around the search bar
   - Animated breathing glow effect using `GlowEffect` component
   - Colors: `#FF8BCF` (pink) → `#F3B0FF` (lighter pink) → `#D3B7FF` (purple)
   - Creates a premium, modern look

2. **Dynamic Placeholder**:
   - Rotating placeholder text (e.g., "I want a guide in...", "Looking for tours in...")
   - Implemented via `DynamicPlaceholder` component

3. **Chat Mode Transition**:
   - When user submits search, hero title fades out
   - Search bar moves to bottom of screen
   - Chat interface appears with message history
   - Smooth animations using Framer Motion

4. **Animated Header Text**:
   - "Find your ideal [tour/guide]" with word switching animation
   - Implemented via `AnimatedSwitchingText` component
   - Switches between "tour" and "guide" every 5 seconds

**Implementation Notes**:
- Search bar uses `rounded-full` for pill shape
- Gradient border is created with absolute positioned divs
- Glow effect uses the `GlowEffect` component from `ui/glow-effect.tsx`
- Chat messages are stored in state and animated on appear

**Location**: Main hero section, rendered in `app/page.tsx`

---

## 🎨 Design System

### Brand Colors
- **Primary Pink**: `#EBC8EB`
- **Secondary Pink**: `#DEB8DE`
- **Purple**: `#9B5CC8`, `#D3B7FF`
- **Gradient Colors**: `#FF8BCF`, `#F3B0FF`, `#D3B7FF`

### Typography
- **Font**: Inter (via `next/font`)
- **Headings**: Bold, large (text-3xl to text-6xl)
- **Body**: Regular weight, gray-700/gray-900

### Spacing
- Carousels: `py-8 px-6` (section padding)
- Cards: `gap-6` between items
- Card width: `w-72` (288px)

---

## 🛠️ Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

---

## 📝 Implementation Checklist

### For Production:

- [ ] **Logo Carousel**: Make logos clickable with proper links
- [ ] **Data Integration**: Connect carousels to your backend API
- [ ] **Search Functionality**: Replace mock chat with real AI/search backend
- [ ] **Image Optimization**: Use Next.js Image component for better performance
- [ ] **Routing**: Add proper links to guide/tour detail pages
- [ ] **Loading States**: Add skeleton loaders for data fetching
- [ ] **Error Handling**: Add error states for failed API calls
- [ ] **Accessibility**: Ensure ARIA labels and keyboard navigation
- [ ] **SEO**: Add proper meta tags and structured data

### Component-Specific:

**GuidesCarousel**:
- [ ] Connect to guides API endpoint
- [ ] Add click handler to navigate to guide detail page
- [ ] Implement "View All" button functionality

**ToursCarousel**:
- [ ] Connect to tours API endpoint
- [ ] Add click handler to navigate to tour detail page
- [ ] Ensure priceType is correctly set from API data

**DestinationsCarousel**:
- [ ] Connect to destinations/countries API
- [ ] Add click handler to navigate to country/destination page
- [ ] Optimize images for faster loading

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📝 License

MIT
