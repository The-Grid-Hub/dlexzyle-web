"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import type { Video } from "@/lib/videos";

interface AmbientVideoProps {
  video: Video;
  className?: string;
}

/**
 * A muted, looping, decorative video for a framed panel (PinVideo is the
 * full-viewport, pinned version). It autoplays like PinVideo, then pauses
 * whenever it is off screen, and stops under prefers-reduced-motion. Hidden
 * from assistive technology: the surrounding copy says what it shows.
 */
export default function AmbientVideo({ video, className = "" }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={video.src}
      poster={video.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
