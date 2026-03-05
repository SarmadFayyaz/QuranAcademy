"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { BookOpen, MapPin } from "lucide-react";

const firstNames = [
  "Ahmed", "Fatima", "Muhammad", "Aisha", "Omar", "Zainab", "Hassan",
  "Maryam", "Ibrahim", "Khadija", "Ali", "Sara", "Yusuf", "Noor",
  "Bilal", "Hana", "Hamza", "Amina", "Tariq", "Ruqayya", "Khalid",
  "Sumaya", "Idris", "Hafsa", "Usman", "Layla", "Zayd", "Asma",
];

const locations = [
  "New York, USA", "Houston, USA", "Chicago, USA", "Los Angeles, USA",
  "London, UK", "Birmingham, UK", "Manchester, UK", "Bradford, UK",
  "Toronto, Canada", "Vancouver, Canada", "Montreal, Canada",
  "Sydney, Australia", "Melbourne, Australia",
  "Riyadh, Saudi Arabia", "Jeddah, Saudi Arabia", "Makkah, Saudi Arabia",
  "Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE",
  "Doha, Qatar",
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

export default function SocialProofNotification() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const scheduleNext = useCallback(() => {
    // 15–60 seconds for subsequent notifications
    const delay = 15000 + Math.random() * 45000;
    timerRef.current = setTimeout(() => {
      setName(pick(firstNames));
      setLocation(pick(locations));
      setCourse(pick(courseNames));
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        scheduleNext();
      }, 4000);
    }, delay);
  }, []);

  useEffect(() => {
    // First notification: 0–15 seconds
    const initialDelay = Math.random() * 15000;
    timerRef.current = setTimeout(() => {
      setName(pick(firstNames));
      setLocation(pick(locations));
      setCourse(pick(courseNames));
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        scheduleNext();
      }, 4000);
    }, initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scheduleNext]);

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
