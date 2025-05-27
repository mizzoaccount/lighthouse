// app/sermons/page.tsx
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Header";
import SermonCard from "@/components/SermonCard";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Cross } from "lucide-react";


// Define the Sermon type to match the expected prop type in SermonCard
type Sermon = {
  id: string;
  title: string;
  preacher: string;
  date: string;
  type: "video" | "pdf" | "audio";
  url: string;
  duration?: string;
};

// Dummy data - this would come from your backend in a real app
const dummySermons: Sermon[] = [
  {
    id: '1',
    title: 'The Power of Faith',
    preacher: 'Pastor John Smith',
    date: '2025-05-15',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45:22',
  },
  {
    id: '2',
    title: 'Walking in Love',
    preacher: 'Rev. Sarah Johnson',
    date: '2025-05-08',
    type: 'pdf',
    url: '/sermons/walking-in-love.pdf',
  },
  {
    id: '3',
    title: 'The Grace of God',
    preacher: 'Dr. Michael Brown',
    date: '2025-05-01',
    type: 'audio',
    url: '/sermons/grace-of-god.mp3',
    duration: '38:15',
  },
  {
    id: '4',
    title: 'Overcoming Trials',
    preacher: 'Pastor John Smith',
    date: '2025-04-24',
    type: 'video',
    url: 'https://www.youtube.com/embed/9bZkp7q19f0',
    duration: '52:10',
  },
  {
    id: '5',
    title: 'Prayer and Fasting',
    preacher: 'Rev. Emily Davis',
    date: '2025-04-17',
    type: 'pdf',
    url: '/sermons/prayer-and-fasting.pdf',
  },
  {
    id: '6',
    title: 'The Holy Spirit',
    preacher: 'Rev. Emily Davis',
    date: '2025-04-10',
    type: 'audio',
    url: '/sermons/holy-spirit.mp3',
    duration: '41:35',
  },
];

const SermonsPage = () => {
  const [sermons, setSermons] = useState<Sermon[]>(dummySermons);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'pdf' | 'audio'>('all');
  const [filterPreacher, setFilterPreacher] = useState('all');

  // Get unique preachers for filter
  const preachers = ['all', ...new Set(dummySermons.map(sermon => sermon.preacher))];

  useEffect(() => {
    let filtered = [...dummySermons];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(sermon =>
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(sermon => sermon.type === filterType);
    }

    // Apply preacher filter
    if (filterPreacher !== 'all') {
      filtered = filtered.filter(sermon => sermon.preacher === filterPreacher);
    }

    setSermons(filtered);
  }, [searchTerm, filterType, filterPreacher]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-12">
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
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Ministry Sermons</h1>
      <p className="text-xl text-blue-100 mb-8">
       Get inspired by our sermons from various preachers, covering a wide range of topics.
      </p>
    </motion.div>
  </div>
</section>
      <div className="container mx-auto px-4">
     

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 bg-white p-6 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Search sermons by title or preacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                options={[
                  { value: 'all', label: 'All Types' },
                  { value: 'video', label: 'Videos' },
                  { value: 'audio', label: 'Audio' },
                  { value: 'pdf', label: 'PDFs' },
                ]}
              />
              <Select
                value={filterPreacher}
                onChange={(e) => setFilterPreacher(e.target.value)}
                options={preachers.map(preacher => ({
                  value: preacher,
                  label: preacher === 'all' ? 'All Preachers' : preacher,
                }))}
              />
            </div>
          </div>
        </div>

        {/* Featured Sermon */}
        {sermons.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Featured Sermon</h3>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-[500px]"
                  src={sermons[0].type === 'video' ? sermons[0].url : 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                  title={sermons[0].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{sermons[0].title}</h2>
                <p className="text-gray-600 mb-4">{sermons[0].preacher} • {new Date(sermons[0].date).toLocaleDateString()} • {sermons[0].duration}</p>
                <p className="text-gray-700">
                  {sermons[0].type === 'video' ? (
                    <a
                      href={sermons[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Watch on YouTube
                    </a>
                  ) : (
                    <a
                      href={sermons[0].url}
                      download
                      className="text-blue-600 hover:underline"
                    >
                      Download {sermons[0].type.toUpperCase()}
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All Sermons */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">All Sermons</h3>
          {sermons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No sermons found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon, index) => (
                    
                <SermonCard key={sermon.id} sermon={sermon} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
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

export default SermonsPage;