"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";

interface VideoCardProps {
  src: string;
  title: string;
  description: string;
  poster?: string;
}

export default function VideoCard({ src, title, description, poster }: VideoCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, closeModal]);

  return (
    <>
      <div className="fade-up rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
        <div className="relative aspect-video bg-gray-900">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full h-full relative flex items-center justify-center group cursor-pointer"
            aria-label={`Play ${title}`}
          >
            {poster ? (
              <img
                src={poster}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center">
                <span className="text-white/20 text-6xl font-bold select-none">{title}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-200">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </button>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      {/* Video Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X size={32} />
            </button>
            <div className="rounded-2xl overflow-hidden bg-black aspect-video">
              <video
                ref={videoRef}
                src={src}
                controls
                autoPlay
                playsInline
                className="w-full h-full"
              />
            </div>
            <p className="text-white text-center mt-3 font-medium">{title}</p>
          </div>
        </div>
      )}
    </>
  );
}
