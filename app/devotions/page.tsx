"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Cross, Hash, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import SectionTitle from "@/ui/SectionTitle";
import DevotionModal from "@/components/DevotionModal";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

type Devotion = {
  _id: string;
  title: string;
  theme: string;
  week: string;
  dayNumber: number;
  date: string;
  mainScripture: string;
  focusScripture: string;
  focusReference: string;
  reflection: string;
  actionPoint: string;
  prayer: string;
  createdAt: string;
  updatedAt: string;
};

const DevotionsPage = () => {
  const [devotions, setDevotions] = useState<Devotion[]>([]);
  const [filteredDevotions, setFilteredDevotions] = useState<Devotion[]>([]);
  const [selectedDevotion, setSelectedDevotion] = useState<Devotion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    theme: "",
    week: "",
    date: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get unique filter options
  const themes = [...new Set(devotions.map(d => d.theme))];
  const weeks = [...new Set(devotions.map(d => d.week))];
  const dates = [...new Set(devotions.map(d => new Date(d.date).toISOString().split('T')[0]))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://outreachbackend.onrender.com/api/devotions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDevotions(data.devotions);
        setFilteredDevotions(data.devotions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let results = devotions;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(devotion => 
        devotion.title.toLowerCase().includes(query) ||
        devotion.theme.toLowerCase().includes(query) ||
        devotion.reflection.toLowerCase().includes(query) ||
        devotion.mainScripture.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.theme) {
      results = results.filter(d => d.theme === filters.theme);
    }
    if (filters.week) {
      results = results.filter(d => d.week === filters.week);
    }
    if (filters.date) {
      results = results.filter(d => 
        new Date(d.date).toISOString().split('T')[0] === filters.date
      );
    }

    setFilteredDevotions(results);
  }, [searchQuery, filters, devotions]);

  const openModal = (devotion: Devotion) => {
    setSelectedDevotion(devotion);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const resetFilters = () => {
    setFilters({
      theme: "",
      week: "",
      date: "",
    });
    setSearchQuery("");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
    <section id="devotions" className="py-12 bg-gray-50 min-h-screen">
{/* Hero Section */}
<section className="relative py-32 bg-gradient-to-b from-blue-900 to-blue-700 text-white overflow-hidden mb-8">
  <div className="absolute inset-0 z-0">
    {/* Update the image path as needed */}
    <Image
      src="/images/devotions-hero-bg.jpg"
      alt="Devotions Background"
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
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Daily Devotions</h1>
      <p className="text-xl text-blue-100 mb-8">
        Dive into daily reflections and scriptures to deepen your faith and connection with God.
      </p>
    </motion.div>
  </div>
</section>
      <div className="container mx-auto px-4">
        {/*<SectionTitle 
          title="Daily Devotions" 
          subtitle="Spiritual nourishment for your journey" 
          center
        />*/}
        {/* Devotions Hero Section */}



        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search devotions..."
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
                transition={{ duration: 0.2 }}
                className="mt-4 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filters.theme}
                      onChange={(e) => setFilters({...filters, theme: e.target.value})}
                    >
                      <option value="">All Themes</option>
                      {themes.map(theme => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Week</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filters.week}
                      onChange={(e) => setFilters({...filters, week: e.target.value})}
                    >
                      <option value="">All Weeks</option>
                      {weeks.map(week => (
                        <option key={week} value={week}>{week}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filters.date}
                      onChange={(e) => setFilters({...filters, date: e.target.value})}
                    >
                      <option value="">All Dates</option>
                      {dates.map(date => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {(filters.theme || filters.week || filters.date) && (
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

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">
            {filteredDevotions.length} {filteredDevotions.length === 1 ? 'Devotion' : 'Devotions'} Found
          </h3>
          {(searchQuery || filters.theme || filters.week || filters.date) && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Devotions Grid */}
        {filteredDevotions.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDevotions.map((devotion, index) => (
              <motion.div
                key={devotion._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <BookOpen className="text-blue-600 h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        {devotion.theme}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {devotion.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(devotion.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Hash className="h-4 w-4" />
                        <span>Day {devotion.dayNumber}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {devotion.reflection}
                    </p>
                    
                    <div className="mt-auto">
                      <button
                        onClick={() => openModal(devotion)}
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
                      >
                        Read Full Devotion
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto max-w-md">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No devotions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? (
                  <>No devotions match your search for "{searchQuery}"</>
                ) : (
                  "Try adjusting your filters to find what you're looking for."
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
      </div>

        {/* Devotion Modal */}
    <DevotionModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        devotion={selectedDevotion} 
      />
 
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

export default DevotionsPage;