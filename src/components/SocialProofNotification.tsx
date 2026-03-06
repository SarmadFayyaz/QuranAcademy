"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { BookOpen, MapPin, Calendar, CheckCircle, X } from "lucide-react";

const firstNames = [
  "Ahmed", "Fatima", "Muhammad", "Aisha", "Omar", "Zainab", "Hassan",
  "Maryam", "Ibrahim", "Khadija", "Ali", "Sara", "Yusuf", "Noor",
  "Bilal", "Hana", "Hamza", "Amina", "Tariq", "Ruqayya", "Khalid",
  "Sumaya", "Idris", "Hafsa", "Usman", "Layla", "Zayd", "Asma",
  "Junaid", "Rabia", "Imran", "Sadia", "Faisal", "Mariam",
];

const lastNames = [
  "Anwar", "Khan", "Ali", "Ahmed", "Hassan", "Hussain", "Malik",
  "Sheikh", "Qureshi", "Siddiqui", "Bukhari", "Farooqi", "Rizvi",
  "Mirza", "Chaudhry", "Iqbal", "Raza", "Javed", "Nawaz", "Shaikh",
];

const locations = [
  "New York", "Houston", "Chicago", "Los Angeles", "Dallas",
  "London", "Birmingham", "Manchester", "Bradford", "Leeds",
  "Toronto", "Vancouver", "Montreal", "Ottawa",
  "Sydney", "Melbourne", "Brisbane",
  "Riyadh", "Jeddah", "Makkah",
  "Dubai", "Abu Dhabi", "Sharjah",
  "Doha", "West Virginia", "Florida", "California", "Texas",
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
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const scheduleNext = useCallback(() => {
    const delay = 15000 + Math.random() * 45000;
    timerRef.current = setTimeout(() => {
      setName(`${pick(firstNames)} ${pick(lastNames)}`);
      setLocation(pick(locations));
      setCourse(pick(courseNames));
      setVisible(true);
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        scheduleNext();
      }, 6000);
    }, delay);
  }, []);

  useEffect(() => {
    const initialDelay = Math.random() * 15000;
    timerRef.current = setTimeout(() => {
      setName(`${pick(firstNames)} ${pick(lastNames)}`);
      setLocation(pick(locations));
      setCourse(pick(courseNames));
      setVisible(true);
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        scheduleNext();
      }, 6000);
    }, initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [scheduleNext]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[95%] transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-xl border-t-[3px] border-t-primary-500 border border-gray-100 p-4 flex items-center gap-3.5">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center shrink-0 relative">
          <BookOpen size={20} className="text-white" />
          <CheckCircle size={16} className="absolute -bottom-0.5 -right-0.5 text-primary-500 fill-white" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900 leading-snug">{name}</p>
          <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
            <BookOpen size={12} className="text-gray-400 shrink-0" />
            Enrolled in <span className="font-bold text-primary-600 ml-0.5">{course}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Calendar size={11} className="shrink-0" />
            Today
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={12} className="text-primary-500" />
              {location}
            </span>
            <button
              onClick={dismiss}
              className="text-gray-300 hover:text-gray-500 transition-colors"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
          <Link
            href="/register"
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Join now &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
