"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Cross,
  Hash,
} from "lucide-react";

type DevotionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  devotion: any;
};

const DevotionModal = ({ isOpen, onClose, devotion }: DevotionModalProps) => {
  if (!devotion) return null;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-white rounded-xl max-w-4xl w-full my-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <Cross className="h-5 w-5 text-gray-700" />
            </button>

            {/* Modal content */}
            <div className="max-h-[80vh] overflow-y-auto rounded-b-xl">
              <div className="p-6 sm:p-8 space-y-8">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="text-blue-600 h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {devotion.theme}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {devotion.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(devotion.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hash className="h-4 w-4" />
                      <span>
                        Day {devotion.dayNumber} • {devotion.week}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sections */}
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-3 text-lg">
                    Main Scripture
                  </h3>
                  <p className="text-gray-800 italic text-lg leading-relaxed">
                    {devotion.mainScripture}
                  </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-3 text-lg">
                    Focus Scripture
                  </h3>
                  <p className="text-gray-800 italic text-lg leading-relaxed mb-2">
                    {devotion.focusScripture}
                  </p>
                  <p className="text-gray-600 font-medium">
                    {devotion.focusReference}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                    Reflection
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    {devotion.reflection
                      .split("\n")
                      .map((paragraph: string, i: number) => (
                        <p key={i} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-3 text-lg">
                    Action Point
                  </h3>
                  <p className="text-gray-800 text-lg">
                    {devotion.actionPoint}
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-3 text-lg">
                    Prayer
                  </h3>
                  <p className="text-gray-800 italic text-lg">
                    {devotion.prayer}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevotionModal;
