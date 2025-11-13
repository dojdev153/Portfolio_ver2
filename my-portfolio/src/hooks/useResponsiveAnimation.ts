import {  useEffect } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const useResponsiveAnimation = () => {
    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        const handleOrientationChange = () =>{
            setTimeout(() =>{
                ScrollTrigger.refresh();
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);

        ScrollTrigger.config({
            ignoreMobileResize: true,
            autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);
};

export const useAnimationperformance = () => {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(prefersReducedMotion){
            gsap.globalTimeline.timeScale(0.1);
        }

        const isMobile = window.innerWidth < 768;
        if(isMobile) {
            gsap.defaults({
                duration: 0.6,
                ease: 'power2.out'
            });
        }

        return () => {
            gsap.globalTimeline.timeScale(1);
        };
    }, []);
};

 export const useAnimationCleanup = () => {
        useEffect(() => {
            return () => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());

                gsap.killTweensOf('*');
            };
        }, []);
};