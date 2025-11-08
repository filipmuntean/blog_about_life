"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

export interface BubbleBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  transition?: {
    stiffness: number;
    damping: number;
  };
  colors?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
}

export function BubbleBackground({
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  colors = {
    first: "80,80,80",     // Dark grey
    second: "120,120,120", // Medium grey
    third: "60,60,60",     // Darker grey
    fourth: "100,100,100", // Light grey
    fifth: "140,140,140",  // Lighter grey
    sixth: "90,90,90",     // Medium-dark grey
  },
  ...props
}: BubbleBackgroundProps) {
  const mouseX = useSpring(0, transition);
  const mouseY = useSpring(0, transition);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const firstX = useTransform(mouseX, (x) => x * 0.1);
  const firstY = useTransform(mouseY, (y) => y * 0.1);
  const secondX = useTransform(mouseX, (x) => x * 0.15);
  const secondY = useTransform(mouseY, (y) => y * 0.15);
  const thirdX = useTransform(mouseX, (x) => x * 0.2);
  const thirdY = useTransform(mouseY, (y) => y * 0.2);
  const fourthX = useTransform(mouseX, (x) => x * 0.25);
  const fourthY = useTransform(mouseY, (y) => y * 0.25);
  const fifthX = useTransform(mouseX, (x) => x * 0.3);
  const fifthY = useTransform(mouseY, (y) => y * 0.3);
  const sixthX = useTransform(mouseX, (x) => x * 0.35);
  const sixthY = useTransform(mouseY, (y) => y * 0.35);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        className="absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>

        <g filter="url(#gooey)">
          <motion.circle
            cx={200}
            cy={200}
            r={80}
            fill={`rgba(${colors.first}, 0.6)`}
            style={{ x: firstX, y: firstY }}
            animate={{
              x: [0, 30, 0, -30, 0],
              y: [0, -30, 0, 30, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx={120}
            cy={120}
            r={60}
            fill={`rgba(${colors.second}, 0.5)`}
            style={{ x: secondX, y: secondY }}
            animate={{
              x: [0, -25, 0, 25, 0],
              y: [0, 25, 0, -25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.circle
            cx={280}
            cy={280}
            r={70}
            fill={`rgba(${colors.third}, 0.4)`}
            style={{ x: thirdX, y: thirdY }}
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -20, 0, 20, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
          <motion.circle
            cx={80}
            cy={280}
            r={50}
            fill={`rgba(${colors.fourth}, 0.3)`}
            style={{ x: fourthX, y: fourthY }}
            animate={{
              x: [0, 35, 0, -35, 0],
              y: [0, -35, 0, 35, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
          />
          <motion.circle
            cx={320}
            cy={120}
            r={65}
            fill={`rgba(${colors.fifth}, 0.5)`}
            style={{ x: fifthX, y: fifthY }}
            animate={{
              x: [0, -40, 0, 40, 0],
              y: [0, 40, 0, -40, 0],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 8,
            }}
          />
          <motion.circle
            cx={200}
            cy={80}
            r={55}
            fill={`rgba(${colors.sixth}, 0.4)`}
            style={{ x: sixthX, y: sixthY }}
            animate={{
              x: [0, 25, 0, -25, 0],
              y: [0, -25, 0, 25, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10,
            }}
          />
        </g>
      </svg>
      {children}
    </div>
  );
}