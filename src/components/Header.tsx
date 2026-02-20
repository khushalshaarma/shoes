import React from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold">Discover Our Luxury Global Experience</div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Products</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">About</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Contact</a>
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white hover:text-gray-300 transition-colors" title="Search">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-white hover:text-gray-300 transition-colors" title="User Account">
              <User className="h-5 w-5" />
            </button>
            <button className="p-2 text-white hover:text-gray-300 transition-colors" title="Shopping Bag">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors" title="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;