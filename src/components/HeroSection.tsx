
import React from "react";

interface HeroSectionProps {
  onStartShopping: () => void;
}

const HeroSection = ({ onStartShopping }: HeroSectionProps) => {
  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl my-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Shop the Latest Trends
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover premium products for your lifestyle. Shop with confidence and enjoy
            our exceptional customer service.
          </p>
          <button
            onClick={onStartShopping}
            className="px-8 py-3 bg-primary text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Shop Now
          </button>
        </div>
        
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="transform translate-y-8">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
              alt="Product"
              className="rounded-lg shadow-lg h-40 w-full object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
              alt="Product"
              className="rounded-lg shadow-lg h-40 w-full object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"
              alt="Product"
              className="rounded-lg shadow-lg h-40 w-full object-cover"
            />
          </div>
          <div className="transform -translate-y-8">
            <img
              src="https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&h=500&fit=crop"
              alt="Product"
              className="rounded-lg shadow-lg h-40 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
