"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, MapPin, X, ChevronRight, User2, Tag, Wallet, Search, Filter, ChevronDown, ChevronUp, Cross } from "lucide-react";
import SectionTitle from "@/ui/SectionTitle";
import Image from "next/image";
import EventModal from "@/components/EventModal";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  featured: boolean;
  image: string;
  speakers: string[];
  registrationRequired: boolean;
  registrationLink: string;
  price: string;
  tags: string[];
};

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    dateRange: "",
    tags: [] as string[],
    featured: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get unique filter options
  const categories = [...new Set(events.map(event => event.category))];
  const prices = ["Free", "Paid"];
  const tags = [...new Set(events.flatMap(event => event.tags))];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://outreachbackend.onrender.com/api/events");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const now = new Date();
        const upcoming = data.events.filter((event: Event) => new Date(event.date) >= now);
        setEvents(upcoming);
        setFilteredEvents(upcoming);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let results = events;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category) {
      results = results.filter(event => event.category === filters.category);
    }

    // Price filter
    if (filters.price) {
      results = results.filter(event => 
        filters.price === "Free" ? event.price === "Free" : event.price !== "Free"
      );
    }

    // Featured filter
    if (filters.featured) {
      results = results.filter(event => event.featured);
    }

    // Tags filter
    if (filters.tags.length > 0) {
      results = results.filter(event =>
        event.tags.some(tag => filters.tags.includes(tag))
      );
    }

    setFilteredEvents(results);
  }, [searchQuery, filters, events]);

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
      category: "",
      price: "",
      dateRange: "",
      tags: [],
      featured: false,
    });
    setSearchQuery("");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
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
    <section className="py-12 bg-gray-50 min-h-screen">
      {/* Hero Section */}
<section className="relative py-32 bg-gradient-to-b from-blue-900 to-blue-700 text-white overflow-hidden mb-8">
  <div className="absolute inset-0 z-0">
    {/* Update the image path as needed */}
    <Image
      src="/images/events-hero-bg.jpg"
      alt="Ministry Events Background"
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
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Ministry Events</h1>
      <p className="text-xl text-blue-100 mb-8">
        Join us for upcoming events designed to inspire, educate, and strengthen your faith.
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
                placeholder="Search events..."
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      value={filters.price}
                      onChange={(e) => setFilters({...filters, price: e.target.value})}
                    >
                      <option value="">All Prices</option>
                      {prices.map(price => (
                        <option key={price} value={price}>{price}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <input
                        type="checkbox"
                        checked={filters.featured}
                        onChange={(e) => setFilters({...filters, featured: e.target.checked})}
                        className="mr-2"
                      />
                      Featured Events Only
                    </label>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Event Tags</h3>
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

                {(filters.category || filters.price || filters.tags.length > 0) && (
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
            {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
          </h3>
          {(searchQuery || filters.category || filters.price || filters.tags.length > 0) && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {event.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-bold text-lg">{event.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarDays className="h-4 w-4 mr-1 text-blue-600" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1 text-blue-600" />
                        {event.time}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                      {event.location}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      View Details <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto max-w-md">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? (
                  <>No events match your search for "{searchQuery}"</>
                ) : (
                  "Try adjusting your filters to find upcoming events"
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

      {/* Event Modal */}
      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        event={selectedEvent} 
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

export default EventsPage;