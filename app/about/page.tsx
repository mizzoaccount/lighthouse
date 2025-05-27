"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/ui/SectionTitle';
import { Users, BookOpen, Globe, HeartHandshake, Cross } from 'lucide-react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  // Dummy data
  const foundingYear = 2005;
  const yearsOfService = new Date().getFullYear() - foundingYear;
  const countriesReached = 12;
  const disciplesTrained = 1500;
  const biblesDistributed = 8500;

  const milestones = [
    { year: 2005, event: "Ministry Founded", description: "Started with small prayer meetings in Nairobi" },
    { year: 2010, event: "First Mission Trip", description: "Sent team to rural Western Kenya" },
    { year: 2015, event: "Radio Ministry Launch", description: "Began broadcasting daily devotionals" },
    { year: 2018, event: "International Expansion", description: "First cross-border mission to Tanzania" },
    { year: 2022, event: "Digital Platform", description: "Launched mobile app for daily devotions" },
  ];

  const coreValues = [
    {
      title: "Biblical Foundation",
      description: "We stand firmly on God's Word as our ultimate authority",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Compassionate Service",
      description: "Demonstrating Christ's love through practical help",
      icon: <HeartHandshake className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Cultural Relevance",
      description: "Contextualizing the Gospel for each community",
      icon: <Globe className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Disciple Multiplication",
      description: "Equipping believers to make more disciples",
      icon: <Users className="h-8 w-8 text-blue-600" />
    }
  ];

  return (
    <>
     <Navbar />
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="Background"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Shining Christ's Light Since {foundingYear}</h1>
            <p className="text-xl text-blue-100 mb-8">
              Transforming lives through the power of the Gospel in East Africa and beyond
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{yearsOfService}+</div>
                <div className="text-sm">Years Serving</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{countriesReached}</div>
                <div className="text-sm">Countries Reached</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{disciplesTrained.toLocaleString()}+</div>
                <div className="text-sm">Disciples Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{biblesDistributed.toLocaleString()}+</div>
                <div className="text-sm">Bibles Distributed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Story" 
            subtitle="How God Has Led Us" 
            center
          />
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-founders.jpg"
                  alt="Ministry Founders"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                From Humble Beginnings
              </h3>
              <p className="text-gray-600 mb-6">
                Lighthouse Outreaches began in {foundingYear} when a small group of believers felt called to take the 
                Gospel beyond the walls of their church. What started as weekly outreach to slum communities has 
                grown into a multi-faceted ministry impacting thousands across {countriesReached} nations.
              </p>
              <p className="text-gray-600 mb-6">
                Our daily devotionals began in 2012 as simple text messages to 50 subscribers. Today, our digital 
                platforms reach over 15,000 believers daily with biblical encouragement and teaching.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                <p className="text-blue-800 font-medium italic">
                  "We exist to share the Gospel, build believers, and reach the unreached with Christ's love."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Journey" 
            subtitle="Key Milestones" 
            center
          />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 w-1 h-full bg-blue-200 transform -translate-x-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`mb-12 relative ${index % 2 === 0 ? 'pr-8 lg:pr-0 lg:pl-8 text-left lg:text-right' : 'pl-8'}`}
              >
                <div className={`flex ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} gap-4`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:ml-8' : 'lg:mr-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{milestone.event}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-lg">
                      {milestone.year}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Foundation" 
            subtitle="Core Values" 
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Devotions */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Daily Spiritual Nourishment" 
            subtitle="Our Devotional Ministry" 
            center
          />
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-blue-600 p-8 text-white flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="h-8 w-8" />
                    <h3 className="text-2xl font-bold">Daily Bread</h3>
                  </div>
                  <p className="mb-6">
                    Fresh biblical insights delivered to your inbox or mobile device each morning
                  </p>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <p className="font-medium">15,000+ subscribers</p>
                    <p className="text-sm opacity-80">Growing daily</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">How It Works</h4>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Scripture Focus</h5>
                        <p className="text-gray-600">Each devotion centers on a key Bible passage</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Practical Reflection</h5>
                        <p className="text-gray-600">Thought-provoking questions for personal application</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Prayer Guide</h5>
                        <p className="text-gray-600">Structured prayer points to deepen your walk with God</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-8 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    Subscribe to Devotions
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
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
    </div>
     <Footer />
    </>
  );
};

export default AboutPage;