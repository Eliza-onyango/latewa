// components/HeroSlideshow.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import your high-quality images here
import heroCommunity from '../assets/Latewa-13.jpg'; // Community leadership image
import heroWaste from '../assets/Latewa-2.jpg'; // Waste management image
import heroLegal from '../assets/Latewa-19.jpg'; // Legal aid image
import heroClimate from '../assets/Latewa-6.jpg'; // Climate action image

const slides = [
  {
    image: heroCommunity,
    title: 'Empowering Community Leaders',
    subtitle: 'Building tomorrow\'s leaders through mentorship and capacity building',
    primaryCTA: { text: 'Join Our Programs', link: '/programs' },
    secondaryCTA: { text: 'Learn More', link: '/about' }
  },
  {
    image: heroWaste,
    title: 'Sustainable Waste Management',
    subtitle: 'Transforming waste into opportunity through innovative recycling programs',
    primaryCTA: { text: 'Get Involved', link: '/get-involved' },
    secondaryCTA: { text: 'Our Impact', link: '/impact' }
  },
  {
    image: heroLegal,
    title: 'Justice for All',
    subtitle: 'Providing legal aid and advocacy for marginalized communities',
    primaryCTA: { text: 'Support Legal Aid', link: '/programs' },
    secondaryCTA: { text: 'Learn More', link: '/about' }
  },
  {
    image: heroClimate,
    title: 'Climate Action Now',
    subtitle: 'Protecting our environment through conservation and sustainable practices',
    primaryCTA: { text: 'Take Action', link: '/get-involved' },
    secondaryCTA: { text: 'Our Programs', link: '/programs' }
  }
];

function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setNextIndex((prev) => (prev + 1) % slides.length);
      
      // After a short delay, update the current index and end transition
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 1000); // Match this with your transition duration
      
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle manual navigation
  const goToSlide = (index) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setNextIndex(index);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px] w-full overflow-hidden bg-black">
      {/* Current Image - Always visible */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* Dark overlay */}
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(2px)',
            transform: 'scale(1.05)'
          }}
        />
      </div>

      {/* Next Image - Crossfading */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" /> {/* Dark overlay */}
            <img
              src={slides[nextIndex].image}
              alt={slides[nextIndex].title}
              className="w-full h-full object-cover"
              style={{
                filter: 'blur(2px)',
                transform: 'scale(1.05)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content - Always visible with smooth transitions */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <span className="inline-block px-4 py-2 bg-red-600/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/20">
                {slides[currentIndex].title.split(' ')[0]} {slides[currentIndex].title.split(' ')[1]}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slides[currentIndex].title}
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                {slides[currentIndex].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={slides[currentIndex].primaryCTA.link}
                  className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {slides[currentIndex].primaryCTA.text}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to={slides[currentIndex].secondaryCTA.link}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  {slides[currentIndex].secondaryCTA.text}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-red-600' 
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        key={currentIndex}
        initial={{ width: 0 }}
        animate={{ width: isTransitioning ? '100%' : '0%' }}
        transition={{ duration: isTransitioning ? 1 : 0, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-red-600 z-30"
      />
    </div>
  );
}

export default HeroSlideshow;