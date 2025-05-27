"use client";
import { motion } from 'framer-motion';
import SectionTitle from '@/ui/SectionTitle';
import Button from '@/ui/Button';
import Image from 'next/image';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { Cross } from 'lucide-react';

const PartnersPage = () => {
  return (
    <>
    <Navbar />
    <section className="py-20 bg-white">
      {/* Hero Section */}
<section className="relative py-32 bg-gradient-to-b from-blue-900 to-blue-700 text-white overflow-hidden mb-8">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/partners-hero-bg.jpg" 
      alt="Partners Background"
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
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Partners</h1>
      <p className="text-xl text-blue-100 mb-8">
        Discover the organizations and individuals who support our mission.
      </p>
    </motion.div>
  </div>
</section>
      <div className="container mx-auto px-4">

        
        <div className="max-w-6xl mx-auto">
          {/* Kahawa Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/kahawa-media-team.jpg" // Replace with your actual image path
                    alt="Kahawa Media Team"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-3xl font-bold text-white">Kahawa Media</h2>
                    <p className="text-blue-200">Discipling Cultures Through Media</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Ministry Overview</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Vision</h4>
                    <p className="text-gray-700">
                      We envision Christians growing in every culture and redeeming every sector of society.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Mission</h4>
                    <p className="text-gray-700">
                      Discipling Cultures through Media. Since 1991, we've been creating Christian media products to extend the gospel's impact throughout East Africa.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-blue-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">One Mission</h4>
                      <p className="text-gray-600 text-sm">
                        The African Continent - Reaching nations with transformative media.
                      </p>
                    </div>
                    <div className="bg-white border border-blue-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">One Approach</h4>
                      <p className="text-gray-600 text-sm">
                        Bible Training Workshops for pastors and leaders.
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    href="https://kahawamedia.com/" 
                    variant="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    Visit Kahawa Media
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Thompson Bible Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/thompson-bible-workshop.jpg" // Replace with your actual image path
                    alt="Thompson Bible Workshop"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-3xl font-bold text-white">Thompson Bible Workshop</h2>
                    <p className="text-blue-200">Equipping Pastors with God's Word</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Bible Training Initiative</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Our Aim</h4>
                    <p className="text-gray-700">
                      To equip Christians with a Biblical worldview, empowering them to be competent and confident facilitators of community transformation.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">One Tool</h4>
                    <p className="text-gray-700">
                      The Thompson Chain-Reference Study Bible - with its wealth of study tools, it equips pastors who often have limited training and resources to prepare sermons.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white border border-blue-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Workshop Impact</h4>
                      <p className="text-gray-600 text-sm">
                        Each week, our graduates apply what they've learned as they preach and teach in their local congregations across Africa.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Graduation Gift</h4>
                    <p className="text-gray-700">
                      Upon graduation, each pastor is awarded a copy of the Thompson Bible. It becomes a treasured resource to those who have no other study tools.
                    </p>
                  </div>
                  
                  <Button 
                    href="https://aptministries.org/" 
                    variant="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    Learn About Workshops
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Partnership Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center text-white shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
            <p className="max-w-2xl mx-auto mb-6 text-blue-100">
              These strategic partnerships enable us to multiply our impact across Africa. 
              Consider how you might support these vital ministries through prayer, giving, or participation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                href="https://kahawamedia.com/give" 
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support Kahawa Media
              </Button>
              <Button 
                href="https://aptministries.org/give" 
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support Bible Workshops
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default PartnersPage;