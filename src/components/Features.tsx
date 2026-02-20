import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Sparkles, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Advanced cushioning technology for maximum performance and speed"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Ultra Durable", 
      description: "Military-grade materials engineered to withstand any challenge"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Premium Craft",
      description: "Hand-finished details with precision manufacturing excellence"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Award Winning",
      description: "Recognized globally for innovation in footwear design"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 100,
            rotationX: 45,
            scale: 0.8
          });

          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out"
              });
            }
          });

          // Hover animations
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-400"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Engineered for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"> Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every detail meticulously crafted to deliver an unparalleled experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => el && (cardsRef.current[index] = el)}
              className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-400 rounded-xl mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;