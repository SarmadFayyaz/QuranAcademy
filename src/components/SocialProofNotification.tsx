"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen, MapPin } from "lucide-react";

const firstNames = [
  "Ahmed", "Fatima", "Muhammad", "Aisha", "Omar", "Zainab", "Hassan",
  "Maryam", "Ibrahim", "Khadija", "Ali", "Sara", "Yusuf", "Noor",
  "Bilal", "Hana", "Hamza", "Amina", "Tariq", "Ruqayya", "Khalid",
  "Sumaya", "Idris", "Hafsa", "Usman", "Layla", "Zayd", "Asma",
];

const locations = [
  "London, UK", "Birmingham, UK", "Manchester, UK", "Bradford, UK",
  "Karachi, PK", "Lahore, PK", "Islamabad, PK", "Rawalpindi, PK",
  "Dubai, UAE", "Toronto, CA", "New York, US", "Sydney, AU",
  "Houston, US", "Chicago, US", "Glasgow, UK", "Leeds, UK",
  "Riyadh, SA", "Jeddah, SA", "Doha, QA", "Kuwait City, KW",
];

const courseNames = [
  "Noorani Qaida", "Quran Reading with Tajweed", "Quran Memorization",
  "Tafsir Course", "Arabic Course", "Islamic Studies",
  "Taleem ul Islam", "Quran Translation", "Ijazah Course",
  "Quranic Arabic", "Mathematics", "English", "Science",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDelay() {
  return 60000 + Math.random() * 240000; // 1-5 minutes
}

export default function SocialProofNotification() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState("");

  const showNotification = useCallback(() => {
    setName(pick(firstNames));
    setLocation(pick(locations));
    setCourse(pick(courseNames));
    setVisible(true);

    setTimeout(() => setVisible(false), 4500);
  }, []);

  useEffect(() => {
    // Initial delay before first notification
    const initialTimeout = setTimeout(showNotification, Math.random() * 60000);

    const interval = setInterval(showNotification, randomDelay() + 4500);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showNotification]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3.5 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
          <BookOpen size={18} className="text-primary-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-gray-900 font-medium leading-snug">
            <span className="font-semibold">{name}</span> just enrolled in{" "}
            <span className="text-primary-600 font-semibold">{course}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <MapPin size={12} />
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
