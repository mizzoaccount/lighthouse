/*"use client"
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Image from 'next/image';

const galleryImages = [
  { id: 1, src: "/images/gallery/outreach1.jpg", alt: "Community outreach" },
  { id: 2, src: "/images/gallery/bible-study.jpg", alt: "Bible study session" },
  { id: 3, src: "/images/gallery/workshop.jpg", alt: "Workshop teaching" },
  { id: 4, src: "/images/gallery/prayer.jpg", alt: "Prayer meeting" },
  { id: 5, src: "/images/gallery/media.jpg", alt: "Media production" },
  { id: 6, src: "/images/gallery/children.jpg", alt: "Children's ministry" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Ministry Gallery" 
          subtitle="Moments from the Field" 
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;*/
"use client"
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryImage = {
  _id: string;
  image: { url: string };
  title: string;
  description: string;
};

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("https://outreachbackend.onrender.com/api/gallery");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGalleryImages(data.galleryItems || []);
      } catch (error) {
        console.error("Error fetching gallery images: ", error);
      }
    };

    fetchGalleryImages();
  }, []);

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigate = (direction: 'prev' | 'next') => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    setSelectedImage(galleryImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      } else if (e.key === 'ArrowLeft') {
        navigate('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Ministry Gallery" 
          subtitle="Moments from the Field" 
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => openModal(image, index)}
            >
              <Image
                src={image.image.url}
                alt={image.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="font-medium text-lg mb-1">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm line-clamp-2">{image.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div className="relative max-w-6xl w-full max-h-screen">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  aria-label="Close gallery"
                >
                  <X size={32} />
                </button>

                {/* Main modal content */}
                <div 
                  className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Image */}
                  <div className="md:w-2/3 relative">
                    <Image
                      src={selectedImage.image.url}
                      alt={selectedImage.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-contain max-h-[70vh] md:max-h-[80vh]"
                    />

                    {/* Navigation arrows */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('prev');
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={32} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('next');
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight size={32} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Info panel */}
                  <div className="md:w-1/3 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                      {selectedImage.title}
                    </h2>
                    {selectedImage.description && (
                      <p className="text-gray-700 mb-4 whitespace-pre-line">
                        {selectedImage.description}
                      </p>
                    )}
                    <div className="text-sm text-gray-500">
                      {currentIndex + 1} of {galleryImages.length}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;