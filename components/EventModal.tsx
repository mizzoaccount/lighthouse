import { useState } from 'react';
import { CalendarDays, Clock, MapPin, X, ChevronRight, User2, Tag, Wallet } from 'lucide-react';
import Image from 'next/image';
import Modal from '../ui/Modal';

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

type EventModalProps = {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
};

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const formatModalDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {event && (
        <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl">
          <div className="relative h-64 w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            >
              <X className="h-5 w-5 text-gray-800" />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </span>
                  {event.featured && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium">
                  {event.price}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Date & Time</h3>
                    <p className="text-gray-600">
                      {formatModalDate(event.date)} at {event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-500 text-sm">{event.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Speakers</h3>
                    <ul className="text-gray-600">
                      {event.speakers.map((speaker, i) => (
                        <li key={i}>{speaker}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Tag className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Tags</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {event.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">About This Event</h3>
              <div className="prose prose-sm text-gray-600">
                {event.description}
              </div>
            </div>

            {event.registrationRequired ? (
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-4">Registration</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all">
                    Register Now
                  </button>
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg text-center transition-colors"
                    >
                      Visit Registration Page
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Open Attendance</h3>
                <p className="text-gray-600 mb-4">
                  No registration required. Just come and join us!
                </p>
                <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-all">
                  Add to Calendar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EventModal;