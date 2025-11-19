"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Clock, Users, ChevronRight, ChevronLeft } from "lucide-react";

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
      rating: 4.9,
      reviews: 342,
      duration: "3 hours",
      groupSize: "Up to 15",
      price: 35,
    },
    {
      id: 2,
      title: "Louvre & Eiffel Tower Experience",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
      rating: 5.0,
      reviews: 567,
      duration: "5 hours",
      groupSize: "Up to 12",
      price: 89,
    },
    {
      id: 3,
      title: "Colosseum & Roman Forum Tour",
      location: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 423,
      duration: "4 hours",
      groupSize: "Up to 20",
      price: 65,
    },
    {
      id: 4,
      title: "Neuschwanstein Castle Day Trip",
      location: "Munich, Germany",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 289,
      duration: "8 hours",
      groupSize: "Up to 25",
      price: 78,
    },
    {
      id: 5,
      title: "Thames River & London Eye",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 512,
      duration: "2.5 hours",
      groupSize: "Up to 30",
      price: 45,
    },
    {
      id: 6,
      title: "Sagrada Familia & Park Güell",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop",
      rating: 5.0,
      reviews: 634,
      duration: "4.5 hours",
      groupSize: "Up to 18",
      price: 72,
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
                  className="w-80 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                >
                  {/* Tour Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{tour.rating}</span>
                      <span className="text-gray-500 text-sm">({tour.reviews})</span>
                    </div>
                  </div>

                  {/* Tour Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{tour.location}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-gray-500 text-sm">From</span>
                        <p className="font-bold text-gray-900 text-xl">€{tour.price}</p>
                      </div>
                      <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                        Book Now
                      </button>
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
    </section>
  );
}
