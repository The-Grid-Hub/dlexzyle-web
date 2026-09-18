"use client";

import { useRef } from "react";
import { reducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Video } from "@/lib/videos";

interface PinVideoProps {
  video: Video;
  /** The hero video also plays the load sequence (grows from a small tile). */
  intro?: boolean;
  /** Where the pin releases, relative to the parent container. */
  end?: "bottom top" | "bottom bottom";
  /** Tint laid over the video so text stays legible. */
  overlayClassName?: string;
}

/**
 * A full-viewport background video that stays put while its parent container
 * scrolls over it. Render it as the first child of a `relative` container; it
 * pins itself from the top of the viewport until the container's `end` edge.
 * The video is muted, looped and decorative, so it carries no audio track and
 * is hidden from assistive technology; the poster shows until it can play.
 */
export default function PinVideo({ video, intro = false, end = "bottom top", overlayClassName = "" }: PinVideoProps) {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapper.current || reducedMotion()) return;
      ScrollTrigger.create({
        trigger: wrapper.current,
        endTrigger: wrapper.current.parentElement,
        start: "top top",
        end,
        pin: true,
        pinSpacing: false,
        refreshPriority: 2,
      });
    },
    { scope: wrapper }
  );

  return (
    <div ref={wrapper} className="pointer-events-none absolute left-0 top-0 -z-10 h-screen w-full overflow-hidden bg-white" aria-hidden="true">
      <div
        data-intro={intro ? "video" : undefined}
        className="absolute left-1/2 top-1/2 h-full w-full [transform:translate(-50%,-50%)]"
      >
        <video
          className="h-full w-full object-cover"
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>
    </div>
  );
}
