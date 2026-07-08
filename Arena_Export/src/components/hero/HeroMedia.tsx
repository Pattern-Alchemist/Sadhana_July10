"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeIn } from "@/motion/variants";

/**
 * HeroMedia — flagship hero component with video/WebP/poster fallback.
 *
 * Rules (per the motion system spec):
 *   - Supports hero image (WebP) or short muted looping video (WebM/MP4)
 *   - Poster fallback required
 *   - Reduced-motion fallback: replaces video with static WebP still
 *   - Hero motion is subtle and atmospheric — no loud autoplay feeling
 *   - Only ONE flagship animated hero (homepage); all other screens use static WebP
 *   - Lazy-load video when possible
 *   - Ambient visual depth comes mostly from CSS, not always-on video
 *
 * Usage:
 *   <HeroMedia
 *     videoSrc="/hero/flame-loop.webm"
 *     posterSrc="/hero/flame-poster.webp"
 *     fallbackSrc="/hero/flame-still.webp"
 *     alt="Sacred flame"
 *   />
 */

interface HeroMediaProps {
  videoSrc?: string;
  posterSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  /** Optional overlay gradient opacity (0-1) */
  overlayOpacity?: number;
}

export default function HeroMedia({
  videoSrc,
  posterSrc,
  fallbackSrc,
  alt,
  className = "",
  overlayOpacity = 0.6,
}: HeroMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Don't attempt video if reduced motion or no videoSrc
  const showVideo = videoSrc && !prefersReducedMotion && !videoError;

  useEffect(() => {
    if (!showVideo) return;
    // Preload the video
    const video = document.createElement("video");
    video.src = videoSrc!;
    video.preload = "metadata";
    video.oncanplay = () => setVideoLoaded(true);
    video.onerror = () => setVideoError(true);
  }, [showVideo, videoSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Poster / fallback image (always present as base layer) */}
      <motion.img
        src={prefersReducedMotion ? fallbackSrc : posterSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        loading="eager"
        aria-hidden="true"
      />

      {/* Video layer (only if supported and not reduced motion) */}
      {showVideo && videoLoaded && (
        <motion.video
          src={videoSrc}
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }}
        />
      )}

      {/* Gradient overlay — for text legibility and atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            rgba(10, 9, 8, ${overlayOpacity * 0.7}) 0%,
            rgba(10, 9, 8, ${overlayOpacity * 0.3}) 50%,
            rgba(10, 9, 8, ${overlayOpacity}) 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Ambient glow — CSS-only, no GPU-heavy layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201, 152, 94, 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
