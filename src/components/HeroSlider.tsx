"use client";

import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { homeServices } from "@/lib/services";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The white card in the hero that fades through the six services on a
 * five-second timer, with an "01/06" counter and a progress bar. Hovering
 * pauses it. Desktop only: phones get a plain "Our services" button instead.
 */
export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  return (
    <div
      data-intro="slide"
      className="hero-slider hidden w-[480px] shrink-0 overflow-hidden rounded-[10px] bg-white text-text-primary lg:block xl:w-[545px]"
    >
      <div className="flex items-center justify-between px-10 pt-8 font-display text-[20px]">
        <p className="tabular-nums text-brand-green" aria-live="polite">
          {pad(index + 1)}
          <span className="text-text-muted">/{pad(homeServices.length)}</span>
        </p>
        <h2>Our services</h2>
      </div>
      <div className="hero-slider__progress mx-10 mt-28" />
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        allowTouchMove={false}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ el: ".hero-slider__progress", type: "progressbar" }}
        onSlideChange={(swiper) => setIndex(swiper.realIndex)}
        className="mt-5"
      >
        {homeServices.map((service) => (
          <SwiperSlide key={service.title} className="bg-white">
            <Link href={service.href} className="group flex items-center justify-between gap-6 px-10 pb-10 pt-2">
              <span className="font-display max-w-[300px] text-[30px] leading-[0.9]">{service.title}</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-brand-green text-white transition-colors group-hover:bg-brand-ink">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
