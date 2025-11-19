"use client";

export default function LogoCarousel() {
  // Tourism and travel certification logos
  const logos = [
    { name: "TripAdvisor", url: "https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" },
    { name: "Booking.com", url: "https://cf.bstatic.com/static/img/booking_logo_knowledge_graph/247454a990efac1952e44dddbf30c58677aa0fd8.png" },
    { name: "Expedia", url: "https://www.expedia.com/_dms/header/logo.svg" },
    { name: "Airbnb", url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { name: "Viator", url: "https://www.viator.com/includes/images/viator-logo.svg" },
    { name: "GetYourGuide", url: "https://cdn.getyourguide.com/tf/assets/static/base/gyg-logo.svg" },
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full mt-6 mb-4">
      {/* Certification Text */}
      <p className="text-center text-sm text-gray-600 mb-4 font-medium">
        All our guides are certified by leading tourism associations
      </p>

      {/* Logo Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        
        {/* Scrolling Logos */}
        <div className="flex gap-8 animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-16 w-36 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
            >
              <img
                src={logo.url}
                alt={`${logo.name} certification`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

