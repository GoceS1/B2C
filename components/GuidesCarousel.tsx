"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";

export default function GuidesCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const guides = [
    {
      id: 1,
      name: "Maria Schmidt",
      location: "Berlin, Germany",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 127,
      specialty: "Historical Tours",
      price: 45,
    },
    {
      id: 2,
      name: "Jean-Pierre Dubois",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5.0,
      reviews: 203,
      specialty: "Art & Culture",
      price: 55,
    },
    {
      id: 3,
      name: "Sofia Rossi",
      location: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 156,
      specialty: "Food & Wine",
      price: 50,
    },
    {
      id: 4,
      name: "Hans Mueller",
      location: "Munich, Germany",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 98,
      specialty: "Architecture",
      price: 42,
    },
    {
      id: 5,
      name: "Emma Johnson",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
      rating: 5.0,
      reviews: 184,
      specialty: "Walking Tours",
      price: 48,
    },
    {
      id: 6,
      name: "Carlos Rodriguez",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 142,
      specialty: "Gaudi & Modernism",
      price: 52,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="w-full py-8 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and View All Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Guides
            </h2>
            <p className="text-gray-600 mt-2">
              Discover expert local guides across Europe
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#eecfee] text-gray-900 font-semibold rounded-full hover:bg-[#d8b8d8] transition-colors">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Container with Arrows */}
        <div className="relative group">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#eecfee] p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#d8b8d8] hover:scale-110 hidden md:flex items-center justify-center text-gray-900"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#eecfee] p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#d8b8d8] hover:scale-110 hidden md:flex items-center justify-center text-gray-900"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Horizontal Scrolling Carousel */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-6" style={{ width: "max-content" }}>
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className="group/card relative w-72 flex-shrink-0 cursor-pointer"
                >
                  {/* Guide Image - Floating card */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                    {/* Top overlay gradient for subtle hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Guide Info - Minimal text below image */}
                  <div className="mt-3">
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug truncate pr-2">
                      {guide.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mt-0.5 truncate">
                      {guide.location}
                    </p>
                    
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-sm text-gray-900">From</span>
                      <span className="text-sm font-bold" style={{ color: '#915A91' }}>€{guide.price}</span>
                      <span className="text-gray-500 text-sm">per person</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.section>
  );
}
