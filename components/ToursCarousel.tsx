"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ToursCarousel() {
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

  const tours = [
    {
      id: 1,
      title: "Historic Berlin Walking Tour",
      location: "Berlin, Germany",
      image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop",
      price: 35,
      priceType: "per person" as const,
      type: "association" as const,
      guides: [
        { name: "Anna", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { name: "Felix", avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=100&h=100&fit=crop" },
        { name: "Lena", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      ],
    },
    {
      id: 2,
      title: "Louvre & Eiffel Tower Experience",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
      price: 89,
      priceType: "per person" as const,
      type: "signature" as const,
      guide: {
        name: "Elise Moreau",
        avatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
      },
    },
    {
      id: 3,
      title: "Colosseum & Roman Forum Tour",
      location: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
      price: 65,
      priceType: "per group" as const,
      type: "association" as const,
      guides: [
        { name: "Marco", avatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" },
        { name: "Giulia", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
        { name: "Riccardo", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
      ],
    },
    {
      id: 4,
      title: "Neuschwanstein Castle Day Trip",
      location: "Munich, Germany",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop",
      price: 78,
      priceType: "per person" as const,
      type: "signature" as const,
      guide: {
        name: "Laura Schäfer",
        avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=100&h=100&fit=crop",
      },
    },
    {
      id: 5,
      title: "Thames River & London Eye",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
      price: 45,
      priceType: "per group" as const,
      type: "association" as const,
      guides: [
        { name: "Emily", avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=100&h=100&fit=crop" },
        { name: "James", avatar: "https://images.unsplash.com/photo-1502764613149-7f1d229e2305?w=100&h=100&fit=crop" },
      ],
    },
    {
      id: 6,
      title: "Sagrada Familia & Park Güell",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop",
      price: 72,
      priceType: "per person" as const,
      type: "signature" as const,
      guide: {
        name: "Isabella Torres",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    },
  ];

  return (
    <section className="w-full py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and View All Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Popular Tours
            </h2>
            <p className="text-gray-600 mt-2">
              Explore the best experiences in top European destinations
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
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="group/card relative w-72 flex-shrink-0 cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-semibold text-gray-900 leading-snug truncate pr-2">
                    {tour.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mt-0.5 truncate">
                    {tour.location}
                  </p>
                  
                  <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="text-sm text-gray-900">From</span>
                    <span className="text-sm font-bold text-gray-900">€{tour.price}</span>
                    <span className="text-gray-500 text-sm">{tour.priceType}</span>
                  </div>

                  {tour.type === "signature" && tour.guide && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={tour.guide.avatar}
                        alt={tour.guide.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-600">Signature tour by {tour.guide.name}</span>
                    </div>
                  )}

                  {tour.type === "association" && tour.guides && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {tour.guides.map((guide, idx) => (
                          <img
                            key={idx}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            src={guide.avatar}
                            alt={guide.name}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">Association tour with {tour.guides.length}+ local guides</span>
                    </div>
                  )}
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
    </section>
  );
}
