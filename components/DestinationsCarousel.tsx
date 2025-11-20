"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function DestinationsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Allow small tolerance for float values
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
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

  const destinations = [
    {
      id: 1,
      name: "Madrid",
      image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=800&fit=crop",
    },
    {
      id: 2,
      name: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop",
    },
    {
      id: 3,
      name: "Rome",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=800&fit=crop",
    },
    {
      id: 4,
      name: "London",
      image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&h=800&fit=crop",
    },
    {
      id: 5,
      name: "Berlin",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=800&fit=crop",
    },
    {
      id: 6,
      name: "Athens",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=800&fit=crop",
    },
    {
      id: 7,
      name: "Lisbon",
      image: "https://images.unsplash.com/photo-1590787979676-e8251b821eb8?w=600&h=800&fit=crop",
    },
    {
      id: 8,
      name: "Amsterdam",
      image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&h=800&fit=crop",
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="w-full py-8 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and View All Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Popular Cities
            </h2>
            <p className="text-gray-600 mt-2">
              Explore top destinations with local experts
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#EBC8EB] text-gray-900 font-semibold rounded-full hover:bg-[#DEB8DE] transition-colors">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#EBC8EB] p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#DEB8DE] hover:scale-110 hidden md:flex items-center justify-center text-gray-900"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#EBC8EB] p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#DEB8DE] hover:scale-110 hidden md:flex items-center justify-center text-gray-900"
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
              {destinations.map((city) => (
                <div
                  key={city.id}
                  className="relative w-72 h-96 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group/card"
                >
                  {/* City Image */}
                  <img
                    src={city.image}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
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
