"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const TOTAL_FRAMES = 72;
const stations = [
  {
    start: 1,
    end: 12,
    title: "Arquitectura del instrumento",
    text: "Todo piano comienza como una estructura de ingeniería capaz de resistir grandes fuerzas internas sin deformarse.",
    concepts: "Diseño estructural · Resistencia · Estabilidad",
  },
  {
    start: 13,
    end: 24,
    title: "Bastidor y soporte",
    text: "El bastidor funciona como el esqueleto del piano: distribuye la tensión de las cuerdas y mantiene estable el instrumento.",
    concepts: "Rigidez · Cargas · Soporte mecánico",
  },
  {
    start: 25,
    end: 36,
    title: "Sistema de cuerdas",
    text: "Cada cuerda vibra a una frecuencia específica. Su longitud, grosor y tensión determinan la altura del sonido.",
    concepts: "Frecuencia · Tensión · Vibración",
  },
  {
    start: 37,
    end: 48,
    title: "Mecánica de acción",
    text: "Al presionar una tecla, un sistema de palancas y martillos transforma el movimiento de la mano en energía sonora.",
    concepts: "Palancas · Martillos · Energía mecánica",
  },
  {
    start: 49,
    end: 60,
    title: "Resonancia",
    text: "La tabla armónica amplifica las vibraciones de las cuerdas y convierte una señal pequeña en sonido audible.",
    concepts: "Resonancia · Amplificación · Acústica",
  },
  {
    start: 61,
    end: 72,
    title: "Precisión y armonía",
    text: "Miles de piezas trabajan coordinadamente para convertir un gesto mínimo de los dedos en una experiencia musical.",
    concepts: "Precisión · Coordinación · Ingeniería musical",
  },
];

function getCurrentStation(frame: number) {
  return stations.find(
    (station) => frame >= station.start && frame <= station.end
  ) ?? stations[0];
}
function framePath(index: number) {
  const frame = String(index).padStart(3, "0");
  return `/img/ezgif-frame-${frame}.jpg`;
}

export default function Home() {
  const [frameIndex, setFrameIndex] = useState(1);
const audioRef = useRef<HTMLAudioElement>(null);
const [started, setStarted] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const frames = useMemo(
    () => Array.from({ length: TOTAL_FRAMES }, (_, i) => framePath(i + 1)),
    []
  );
 useEffect(() => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);
  setFrameIndex(1);
}, []);

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
const currentStation = getCurrentStation(frameIndex);
const startExperience = () => {
  audioRef.current?.play();
  setStarted(true);
  setIsPlaying(true);
};
const toggleMusic = () => {
  if (!audioRef.current) return;

  if (audioRef.current.paused) {
    audioRef.current.play();
    setIsPlaying(true);
  } else {
    audioRef.current.pause();
    setIsPlaying(false);
  }
};
  return (
    <main className="min-h-[500vh] bg-white">
      <section className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative text-center z-10 bg-white/95 px-6 py-1 rounded-xl titleIntro">
  <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
    Un viaje visual a través de la mecánica, la precisión y la armonía
  </p>
  <h1 className="mt-2 text-4xl font-bold text-zinc-900 typewriterTitle">
    Ingeniería musical: el alma de un piano
  </h1>
  <div className="mt-6 max-w-md rounded-xl border border-zinc-200 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm">
  
  <p className="text-sm font-semibold text-zinc-900">
    {currentStation.title}
  </p>

  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
    {currentStation.text}
  </p>

  <p className="mt-4 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
  {currentStation.concepts}
</p>

<audio ref={audioRef} src="/audio/gymnopedie.mp3" preload="auto" />

<button
  type="button"
  onClick={started ? toggleMusic : startExperience}
  className="mt-5 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700"
>
  {started
    ? (isPlaying ? "Pausar música" : "Reanudar música")
    : "Comenzar recorrido"}
</button>
</div>
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