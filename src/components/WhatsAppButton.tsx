"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923105175338"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
    >
      <MessageCircle size={22} className="fill-white" />
      <span className="text-sm font-semibold hidden sm:inline">Chat with Us</span>
    </a>
  );
}
