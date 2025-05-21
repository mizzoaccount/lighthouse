"use client"
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

export default Gallery;