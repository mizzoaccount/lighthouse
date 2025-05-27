// components/Sermons.tsx
"use client";

import SectionTitle from '@/ui/SectionTitle';
import SermonCard from './SermonCard';
import type { Sermon } from './SermonCard'; // <-- Fix: import Sermon as a type

const sermons: Sermon[] = [ // <-- Explicitly type the array
  {
    id: '1',
    title: "The Power of the Gospel",
    preacher: "Rev. Michael Thompson",
    date: "2025-05-05",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "45:30"
  },
  {
    id: '2',
    title: "Walking in Faith",
    preacher: "Pastor Sarah Johnson",
    date: "2025-04-28",
    type: "audio",
    url: "#",
    duration: "38:15"
  },
  {
    id: '3',
    title: "Kingdom Principles",
    preacher: "Dr. James Mwangi",
    date: "2025-04-21",
    type: "pdf",
    url: "#"
  },
];

const Sermons = () => {
  return (
    <section id="sermons" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Word & Teaching" 
          subtitle="Sermons & Resources" 
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sermons.map((sermon, index) => (
            <SermonCard key={sermon.id} sermon={sermon} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sermons;