"use client";
import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface AnimatedCircularProgressProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  reverse?: boolean;
  children?: ReactNode;
}

export const AnimatedCircularProgress = ({
  size = 100,
  strokeWidth = 10,
  color = "#45ed69",
  duration = 2,
  reverse = false,
  children,
}: AnimatedCircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      strokeDashoffset: reverse ? circumference : 0,
      transition: { duration, ease: "easeInOut" },
    });
  }, [reverse, controls, circumference, duration]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1f2937"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated foreground ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="square"
          animate={controls}
          style={{
            transform: `rotate(90deg)`,
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
