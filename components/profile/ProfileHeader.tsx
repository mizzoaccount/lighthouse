"use client";

import { motion } from "framer-motion";
import { Edit, LogOut } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  joinedDate: string;
  role: string;
  onEditAvatar: () => void;
}

export const ProfileHeader = ({
  firstName,
  lastName,
  email,
  avatar,
  joinedDate,
  role,
  onEditAvatar,
}: ProfileHeaderProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 relative"
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full">
          <div className="relative">
            <Image
              src={avatar}
              alt={`${firstName} ${lastName}`}
              width={128}
              height={128}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-600"
            />
            <button
              onClick={onEditAvatar}
              className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md"
              aria-label="Edit avatar"
            >
              <Edit size={16} className="text-white" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-1">
              {firstName} {lastName}
            </h1>
            <p className="text-gray-700 mb-1">{email}</p>
            <p className="text-gray-500 text-sm">Member since {joinedDate}</p>
            {role === "admin" && (
              <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold rounded-full">
                ADMIN
              </span>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="absolute top-0 right-0 md:relative md:top-auto md:right-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium rounded-full transition-all shadow-sm"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </motion.section>
  );
};