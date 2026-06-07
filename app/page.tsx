"use client";

import { useEffect, useMemo, useState } from "react";

const TOTAL_FRAMES = 72;

function framePath(index: number) {
  const frame = String(index).padStart(3, "0");
  return `/img/ezgif-frame-${frame}.jpg`;
}

export default function Home() {
  const [frameIndex, setFrameIndex] = useState(1);

  const frames = useMemo(
    () => Array.from({ length: TOTAL_FRAMES }, (_, i) => framePath(i + 1)),
    []
  );

  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const nextFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.ceil(progress * TOTAL_FRAMES))
      );

      setFrameIndex(nextFrame);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-[500vh] bg-white">
      <section className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-10 bg-white/95 px-6 py-1 rounded-xl">
  <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
    Un viaje visual a través de la mecánica, la precisión y la armonía
  </p>
  <h1 className="mt-2 text-4xl font-bold text-zinc-900">
    Ingeniería musical: el alma de un piano
  </h1>
</div>
        <img
          src={framePath(frameIndex)}
          alt={`Animación de piano frame ${frameIndex}`}
          className="max-h-[60vh] max-w-[65vw] object-contain"
/>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white">
          Frame {frameIndex} / {TOTAL_FRAMES}
        </div>
      </section>
    </main>
  );
}