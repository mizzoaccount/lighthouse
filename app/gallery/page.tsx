"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search, Filter, ChevronDown, ChevronUp, Cross } from 'lucide-react';
import SectionTitle from '@/ui/SectionTitle';
import Image from 'next/image';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

type GalleryImage = {
  _id: string;
  title: string;
  description: string;
  image: { url: string };
  createdAt: Date;
  tags: string[];
};

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    tags: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get unique filter options
  const tags = [...new Set(galleryImages.flatMap(image => image.tags))];

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("https://outreachbackend.onrender.com/api/gallery");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGalleryImages(data.galleryItems || []);
        setFilteredImages(data.galleryItems || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching gallery images: ", error);
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  /*useEffect(() => {
    let results = galleryImages;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(image =>
        image.title.toLowerCase().includes(query) ||
        image.description.toLowerCase().includes(query) ||
        image.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      results = results.filter(image =>
        image.tags.some(tag => filters.tags.includes(tag))
      );
    }

    setFilteredImages(results);
  }, [searchQuery, filters, galleryImages]);*/

  useEffect(() => {
  let results = galleryImages;

  // Search filter (only title and description)
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    results = results.filter(image =>
      image.title.toLowerCase().includes(query) ||
      image.description.toLowerCase().includes(query)
    );
  }

  // Tags filter (if still used separately by toggling checkboxes)
  if (filters.tags.length > 0) {
    results = results.filter(image =>
      image.tags?.some(tag => filters.tags.includes(tag))
    );
  }

  setFilteredImages(results);
}, [searchQuery, filters, galleryImages]);


  const toggleTagFilter = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const resetFilters = () => {
    setFilters({
      tags: [],
    });
    setSearchQuery('');
  };

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
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[newIndex]);
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

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <Navbar />
    <section className="py-12 bg-gray-50 min-h-screen">
      {/* Hero Section */}
<section className="relative py-32 bg-gradient-to-b from-blue-900 to-blue-700 text-white overflow-hidden mb-8">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/gallery-hero-bg.jpg" 
      alt="Ministry Gallery Background"
      fill
      className="object-cover opacity-20"
    />
  </div>
  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Ministry Gallery</h1>
      <p className="text-xl text-blue-100 mb-8">
        Explore our gallery to see the impact of our ministries through photos and stories.
      </p>
    </motion.div>
  </div>
</section>
      <div className="container mx-auto px-4">
      

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search gallery..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTagFilter(tag)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.tags.includes(tag)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(filters.tags.length > 0) && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={resetFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">
            {filteredImages.length} {filteredImages.length === 1 ? 'Image' : 'Images'} Found
          </h3>
          {(searchQuery || filters.tags.length > 0) && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto max-w-md">
              <X className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No images found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? (
                  <>No images match your search for "{searchQuery}"</>
                ) : (
                  "Try adjusting your filters to find images"
                )}
              </p>
              <div className="mt-6">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
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
                    {filteredImages.length > 1 && (
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
                      {currentIndex + 1} of {filteredImages.length}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
         {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Cross className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in This Mission</h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether through prayer, giving, or going, there's a place for you in this work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
                Partner With Us
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors">
                Share Your Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>
     <Footer />
    </>
  );
};

export default GalleryPage;