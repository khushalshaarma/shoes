import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(titleRef.current, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          );
        }
      });

      // Images stagger animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.fromTo(imagesRef.current,
            { opacity: 0, y: 100, rotationY: 45, scale: 0.8 },
            { 
              opacity: 1, 
              y: 0, 
              rotationY: 0, 
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out"
            }
          );
        }
      });

      // Content animation
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(contentRef.current?.children || [],
            { opacity: 0, x: 50 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out"
            }
          );
        }
      });

      // Parallax effect for images
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          imagesRef.current.forEach((img, index) => {
            if (img) {
              const speed = (index + 1) * 0.5;
              gsap.set(img, {
                y: self.progress * speed * 100
              });
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-15 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
          >
            Welcome to Our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              Luxury Global Store
            </span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Multiple product images */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div 
                ref={el => el && (imagesRef.current[0] = el)}
                className="group relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img 
                  src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Premium Sneaker 1"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div 
                ref={el => el && (imagesRef.current[1] = el)}
                className="group relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img 
                  src="https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Premium Sneaker 2"
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="pt-12">
              <div 
                ref={el => el && (imagesRef.current[2] = el)}
                className="group relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img 
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Premium Sneaker 3"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div ref={contentRef} className="space-y-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Discover Premium
              <span className="text-red-500"> Footwear</span>
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience the perfect fusion of cutting-edge technology, premium materials, 
              and timeless design in our meticulously curated collection.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Handcrafted Excellence</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span className="text-gray-700 font-medium">Sustainable Materials</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Limited Edition Designs</span>
              </div>
            </div>
            <button className="group relative bg-gradient-to-r from-red-500 to-orange-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;