"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";
import type { FC, ReactNode } from "react";
import { createNoise3D } from "simplex-noise";
import type { NoiseFunction3D } from "simplex-noise";

interface WavyBackgroundProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}

export const WavyBackground: FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = useRef<NoiseFunction3D>(createNoise3D());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  // Move these to useRef to maintain values between renders
  const wRef = useRef<number>(0);
  const hRef = useRef<number>(0);
  const ntRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasInstanceRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number>();

  const getSpeed = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  const drawWave = useCallback(
    (n: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      ntRef.current += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth ?? 50;
        ctx.strokeStyle = colors[i % colors.length];
        for (let x = 0; x < wRef.current; x += 5) {
          const y = noise.current(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + hRef.current * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    },
    [getSpeed, colors, waveWidth],
  );

  const render = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.fillStyle = backgroundFill ?? "black";
    ctx.globalAlpha = waveOpacity ?? 0.5;
    ctx.fillRect(0, 0, wRef.current, hRef.current);
    drawWave(5);
    animationIdRef.current = window.requestAnimationFrame(render);
  }, [backgroundFill, drawWave, waveOpacity]);

  const init = useCallback(() => {
    canvasInstanceRef.current = canvasRef.current;
    if (!canvasInstanceRef.current) return;

    ctxRef.current = canvasInstanceRef.current.getContext("2d");
    if (!ctxRef.current) return;

    wRef.current = ctxRef.current.canvas.width = window.innerWidth;
    hRef.current = ctxRef.current.canvas.height = window.innerHeight;
    ctxRef.current.filter = `blur(${blur}px)`;
    ntRef.current = 0;

    window.onresize = () => {
      if (!ctxRef.current) return;
      wRef.current = ctxRef.current.canvas.width = window.innerWidth;
      hRef.current = ctxRef.current.canvas.height = window.innerHeight;
      ctxRef.current.filter = `blur(${blur}px)`;
    };

    render();
  }, [blur, render]);

  useEffect(() => {
    init();
    return () => {
      if (animationIdRef.current !== undefined) {
        window.cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [init]);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-16",
        containerClassName,
      )}
      {...props}
    >
      <canvas
        className="absolute inset-0 h-full w-full"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10 flex h-full w-full flex-col", className)}>{children}</div>
    </div>
  );
};
