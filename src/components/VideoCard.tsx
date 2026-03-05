"use client";

import { useState, useRef } from "react";
import { Play } from "lucide-react";

interface VideoCardProps {
  src: string;
  title: string;
  description: string;
}

export default function VideoCard({ src, title, description }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    // Video will load and autoplay after state update
    setTimeout(() => videoRef.current?.play(), 0);
  };

  return (
    <div className="fade-up rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="relative aspect-video bg-gray-900">
        {playing ? (
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        ) : (
          <button
            onClick={handlePlay}
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-800 to-primary-950 group cursor-pointer"
            aria-label={`Play ${title}`}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-200">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
