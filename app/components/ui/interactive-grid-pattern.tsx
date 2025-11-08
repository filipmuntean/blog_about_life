"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "../../../lib/utils";

interface CursorBubbleAnimationProps {
  className?: string;
}

export function CursorBubbleAnimation({
  className,
  ...props
}: CursorBubbleAnimationProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseTrail, setMouseTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY, id: Date.now() };
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setMouseTrail(prev => {
        const newTrail = [newPosition, ...prev].slice(0, 15); // Keep last 15 positions
        return newTrail;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>      
      {/* Trailing particles that follow mouse path */}
      {mouseTrail.map((position, index) => (
        <motion.div
          key={position.id}
          className="absolute rounded-full"
          style={{
            left: position.x - (8 - index * 0.4),
            top: position.y - (8 - index * 0.4),
            width: Math.max(2, 8 - index * 0.4),
            height: Math.max(2, 8 - index * 0.4),
            backgroundColor: `hsla(${260 + index * 8}, 70%, 60%, ${Math.max(0.1, 0.8 - index * 0.05)})`,
          }}
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.2, 0.8],
            opacity: Math.max(0, 1 - index * 0.08)
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Sparkle particles that emit from mouse movement */}
      {mouseTrail.slice(0, 3).map((position, index) => (
        [...Array(3)].map((_, sparkleIndex) => (
          <motion.div
            key={`${position.id}-sparkle-${sparkleIndex}`}
            className="absolute w-1 h-1 bg-white/70 rounded-full"
            style={{
              left: position.x,
              top: position.y,
            }}
            initial={{ 
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              scale: [0, 1.5, 0],
              x: (Math.random() - 0.5) * 40,
              y: (Math.random() - 0.5) * 40,
              opacity: [1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: Math.random() * 0.3,
              ease: "easeOut",
            }}
          />
        ))
      )).flat()}
    </div>
  );
}