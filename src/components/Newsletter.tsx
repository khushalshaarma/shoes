import { Mail } from 'lucide-react';
const Newsletter = () => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500 p-4 rounded-full">
              <Mail className="h-8 w-8" />
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be the first to know about new releases, exclusive offers, and sneaker drops
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;