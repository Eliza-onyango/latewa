import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Upload, Image as ImageIcon, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import gallery1 from '../assets/images (2).jpg';
import gallery2 from '../assets/Latewa-2.jpg';
import gallery3 from '../assets/Latewa-6.jpg';
import gallery4 from '../assets/Latewa-13.jpg';
import gallery5 from '../assets/Latewa-19.jpg';
import gallery6 from '../assets/latewa1.jpg';

const Gallery = () => {
  const [images, setImages] = useState([
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleDeleteImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (selectedImage === index) {
      setSelectedImage(null);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent pointer-events-none"></div>
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="decoration-line mx-auto mb-6"></div>
            <h1 className="heading-xl text-gray-900 mb-6">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-body-lg mb-8 leading-relaxed">
              Explore photos from our programs, events, and community initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={img} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Gallery Image {index + 1}</h3>
                      <p className="text-sm text-gray-200">Click to view full size</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(index);
                      }}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative aspect-video">
              <img 
                src={images[selectedImage]} 
                alt={`Gallery ${selectedImage + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Gallery Image {selectedImage + 1}</h3>
              <p className="text-gray-600">Click outside to close</p>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Gallery;
