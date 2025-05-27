// components/sermons/SermonCard.tsx
"use client";

import { motion } from 'framer-motion';
import Card from '../ui/Card';

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  type: 'video' | 'pdf' | 'audio';
  url: string;
  thumbnail?: string;
  duration?: string;
}

const SermonCard = ({ sermon, index }: { sermon: Sermon; index: number }) => {
  return (
    <motion.div
      key={sermon.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col">
        {/* Thumbnail for videos */}
        {sermon.type === 'video' && (
          <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={sermon.url}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        
        {/* PDF/audio thumbnail */}
        {(sermon.type === 'pdf' || sermon.type === 'audio') && (
          <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-2">
                {sermon.type === 'pdf' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                )}
              </div>
              <h3 className="font-bold text-lg">{sermon.title}</h3>
            </div>
          </div>
        )}

        <div className="flex-grow p-4">
          <div className="flex items-start mb-3">
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800 text-lg">{sermon.title}</h3>
              <p className="text-gray-600">{sermon.preacher}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-500">{sermon.date}</span>
            {sermon.duration && (
              <span className="text-sm text-gray-500">{sermon.duration}</span>
            )}
          </div>
        </div>

        <div className="p-4 pt-0">
          <a
            href={sermon.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full block text-center py-2 px-4 rounded-lg font-medium ${
              sermon.type === 'video'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {sermon.type === 'video'
              ? 'Watch Now'
              : sermon.type === 'audio'
              ? 'Listen Now'
              : 'Download PDF'}
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default SermonCard;