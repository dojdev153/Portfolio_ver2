import React, { type ReactNode } from "react";
import {
  useFadeIn,
  useScaleIn,
  useSlideIn,
  useStaggerIn,
} from "../hooks/useGSAP";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fadeIn" | "scaleIn" | "slideIn" | "staggerIn";
  direction?: "left" | "right" | "top" | "bottom"; // used for fadeIn + slideIn
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = "fadeIn",
  direction = "bottom",
  delay = 0,
  duration = 1,
  className = "",
  id,
}) => {
  // Base config shared by most animations
  const baseConfig = {
    delay,
    duration,
    once: true,
  };

  // Call ALL hooks (rules-of-hooks safe), then choose which ref to use
  const fadeRef = useFadeIn({
    ...baseConfig,
    from: direction,
    distance: 50,
  });

  const scaleRef = useScaleIn({
    ...baseConfig,
  });

  const slideRef = useSlideIn(direction, {
    ...baseConfig,
  });

  const staggerRef = useStaggerIn({
    ...baseConfig,
    stagger: 0.2,
  });

  // Pick the correct ref based on animation type
  const ref =
    animation === "fadeIn"
      ? fadeRef
      : animation === "scaleIn"
      ? scaleRef
      : animation === "slideIn"
      ? slideRef
      : staggerRef;

  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  );
};

export default AnimatedSection;
