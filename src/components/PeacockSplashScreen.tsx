import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

interface PeacockSplashScreenProps {
  onComplete: () => void;
}

export const PeacockSplashScreen: React.FC<PeacockSplashScreenProps> = ({ onComplete }) => {
  const [isZooming, setIsZooming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play peaceful royal chime via Web Audio API
  const playRegalChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Golden harmonic chords (F# major chord evoking tranquil Indian classical raga)
      const freqs = [369.99, 466.16, 554.37, 739.99];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 2.6);
      });
    } catch {
      // Audio fallback
    }
  };

  const handleStartZoom = () => {
    if (isZooming) return;
    if (soundEnabled) {
      playRegalChime();
    }
    setIsZooming(true);
    // After 2.2s zoom finishes, notify parent
    setTimeout(() => {
      onComplete();
    }, 2200);
  };

  // Auto-progress timer for smooth automatic entry if user doesn't click
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          handleStartZoom();
          return 100;
        }
        return prev + 3; // ~3.3 seconds total dwell before smooth auto zoom
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={handleStartZoom}
      className={`fixed inset-0 z-50 overflow-hidden bg-black flex items-center justify-center cursor-pointer select-none transition-opacity duration-1000 ${
        isZooming ? 'pointer-events-none' : ''
      }`}
      title="Click anywhere to enter The Vrindavan Palace"
    >
      {/* Full-Screen Pure Peacock Feather - No yellow dots, purely the feather */}
      <div
        className={`absolute inset-0 w-full h-full transition-transform ease-in ${
          isZooming
            ? 'scale-[18] filter blur-[3px] brightness-150 duration-[2200ms]'
            : 'scale-100 hover:scale-[1.02] duration-700'
        }`}
        style={{
          transformOrigin: '53% 47%', // Exact focal point of the natural peacock feather eye
        }}
      >
        <img
          src="/src/assets/images/peacock_feather_hyperrealistic_1792133386698.jpg"
          alt="The Vrindavan Royal Peacock Feather"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />

        {/* Minimal soft vignette to blend into screen edges without hiding the feather */}
        <div className="absolute inset-0 bg-radial-vignette from-transparent via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Discrete Top Controls */}
      <div
        className={`absolute top-6 right-6 z-30 flex items-center gap-3 transition-opacity duration-500 ${
          isZooming ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playRegalChime();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-200/90 text-xs tracking-wider uppercase hover:border-amber-400 hover:text-white transition-colors cursor-pointer backdrop-blur-md"
          title="Toggle ambient welcome sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 opacity-60" />
          )}
          <span className="hidden sm:inline">{soundEnabled ? 'Ambiance On' : 'Mute'}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-200/90 text-xs tracking-wider uppercase hover:border-amber-400 hover:text-white transition-colors cursor-pointer backdrop-blur-md"
        >
          Skip
        </button>
      </div>

      {/* Minimal, quiet bottom cue (doesn't obstruct the peacock feather) */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none transition-all duration-700 ${
          isZooming ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="px-5 py-2 rounded-full bg-black/75 border border-amber-500/30 backdrop-blur-md shadow-2xl flex items-center gap-3">
          <span className="font-cinzel text-xs tracking-[0.25em] text-amber-200 font-semibold uppercase">
            The Vrindavan · Indore
          </span>
          <span className="text-amber-500/60">·</span>
          <span className="text-[11px] text-stone-300 tracking-wider uppercase flex items-center gap-1 font-light">
            <span>Click to enter</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </span>
        </div>

        {/* Minimal delicate progress bar */}
        <div className="w-36 h-0.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-amber-300 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Luminous Golden Dawn Flash when camera dives into the feather eye */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
          isZooming
            ? 'opacity-100 bg-[radial-gradient(circle_at_53%_47%,_rgba(254,240,138,0.95)_0%,_rgba(14,116,144,0.85)_45%,_#080c14_90%)]'
            : 'opacity-0'
        }`}
      />
    </div>
  );
};
