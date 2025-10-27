import React from 'react';

const FeaturedProduct = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Discover Yourself in a Captivating
            <br />
            Brand Experience
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Product info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Sneaker Your Soul Desires</h3>
                <p className="text-gray-400">Premium Collection</p>
              </div>
            </div>
            <p className="text-gray-300">
              Crafted with precision and designed for those who appreciate the finer things in life. 
              Each pair tells a story of innovation and style.
            </p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Discover More
            </button>
          </div>
          
          {/* Right side - Product image */}
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Featured Sneaker"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;