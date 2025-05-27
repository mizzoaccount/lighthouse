'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 md:pt-0">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, type: 'spring' }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-red-500 rounded-full mix-blend-screen blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-white rounded-full mix-blend-screen blur-3xl opacity-20" />
      </motion.div>

      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main Content Container - Reduced gap on large screens */}
      <div className="relative z-20 container mx-auto px-4 py-8 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        {/* Image Content */}
        <motion.div 
          className="lg:w-1/2 relative w-full order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-80 sm:h-96 md:h-[28rem] lg:h-[600px] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl mx-auto">
            <Image
              src="/assets/images/media/musau1.JPG"
              alt="lighthouse"
              fill
              className="object-cover object-[center_0%]"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
            <div className="absolute inset-0 border-8 border-white/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
          
        
        </motion.div>

        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1 lg:pl-8">
          <div className="overflow-hidden">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Outreaches
              </span>
              <br />
              <span className="text-blue-800 mt-2 inline-block"> Ministry</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-8 lg:max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Transforming lives through faith, hope, and divine love. Join us in our mission to spread 
            God's word across nations.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 lg:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 transition-all"
            >
              <FiHeart className="text-xl" />
              <Link href="/donate" className="text-white font-medium">
                Support the Ministry
              </Link>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center gap-2 text-base md:text-lg hover:bg-blue-600 hover:text-white transition-all"
            >
              <Link href="#/give" className="text-blue-600 hover:text-white font-medium">
                Upcoming Events
              </Link>
              <FiArrowRight className="text-xl" />
            </motion.button>
          </motion.div>

          {/* Verse of the Day */}
          <motion.div
            className="mx-auto lg:mx-0 max-w-md bg-white/30 backdrop-blur-sm p-4 md:p-6 mt-8 rounded-2xl border border-white/10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-blue-400 text-sm mb-2">Today's Verse</p>
            <p className="text-blue-800 italic">"For I know the plans I have for you, declares the Lord..."</p>
            <p className="text-gray-700 text-sm mt-2">Jeremiah 29:11</p>
          </motion.div>
        </div>
      </div>

  
    </section>
  );
}