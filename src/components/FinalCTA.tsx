import React from 'react';

const FinalCTA = () => {
  return (
    <section className="py-16 bg-red-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Elevate Your Style
              <br />
              with Red Hot
            </h2>
            <p className="text-red-100">
              Step into confidence with our signature red collection. 
              Bold, beautiful, and built to make a statement.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Shop Collection
            </button>
          </div>
          
          {/* Right side - Product image */}
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Red Sneaker"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;