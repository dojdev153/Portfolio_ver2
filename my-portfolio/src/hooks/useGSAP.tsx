import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

export interface AnimationConfig {
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
    once?: boolean;
    start?: string;
    end?: string;
    scrub?: boolean | number;
}

export interface FadeInConfig extends AnimationConfig {
    from?: 'top' | 'bottom' | 'left' | 'right';
    distance?: number;
}

export interface ScaleConfig extends AnimationConfig {
    from?: number;
    to?: number;
}

export interface ParallaxConfig extends AnimationConfig {
    speed?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

const killTween = (tween: gsap.core.Tween) => {
    tween.scrollTrigger?.kill();
    tween.kill();
};

//hooks
export const useFadeIn = (config: FadeInConfig = {}) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if(!el)return;

        const{
            duration = 1,
            delay = 0,
            ease = "power2.out",
            stagger = 0,
            once = true,
            from = "bottom",
            distance = 50,
            start = "top 80%",
            end = "bottom 20%",
            scrub,
        } = config;

        gsap.set(el, {opacity: 0, x: 0, y: 0});

        if(from === "top") gsap.set(el, {y: -distance});
        if(from === "bottom") gsap.set(el, {y: distance});
        if(from === "left") gsap.set(el, {x: -distance});
        if(from === "right") gsap.set(el,{x: distance});

        const children = el.children;

        const tween = gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease,
            stagger: children.length > 0 ? stagger : 0,
            scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub,
                once,
                toggleActions: once
                    ? "play none none none"
                    : "play none none reverse",
            },
        });

        return () => {
            killTween(tween);
        };
    }, [JSON.stringify(config)]);

    return ref;
};

export const useScaleIn = (config: ScaleConfig = {}) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if(!el) return;

        const {
            duration = 1,
            delay = 0,
            ease = "back.out(1.7)",
            stagger = 0,
            once = true,
            from = 0.8,
            to = 1,
            start = "top 80%",
            end = "bottom 20%",
            scrub,
        } = config;

        const children = el.children;

        gsap.set(el, {opacity: 0, scale: from});

        const tween = gsap.to(el, {
            opacity: 1,
            scale: to,
            duration,
            delay,
            ease,
            stagger: children.length > 0 ? stagger : 0,
            scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub,
                once,
                toggleActions: once
                    ? "play none none none"
                    : "play none none reverse",

            },
        });

        return () => {
            killTween(tween);
        };
    }, [JSON.stringify(config)]);

    return ref;
};

export const useStaggerIn = (config: AnimationConfig = {}) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if(!el) return;

        const {
            duration = 0.8,
            delay = 0,
            ease = "power2.out",
            stagger = 0.2,
            start = "top 80%",
            end = "bottom 20%",
            scrub,
            once = true,
        } = config;

        const children = Array.from(el.children);
        if(children.length === 0) return;

        gsap.set(children, {opacity: 0, y: 50});

        const tween = gsap.to(children, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease,
            stagger,
            scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub,
                once,
                toggleActions: once
                    ? "play none none none"
                    : "play none none reverse",
            },
        });

        return () => {
            killTween(tween);
        };
    }, [JSON.stringify(config)]);

    return ref;
};

export const useParallax = (config: ParallaxConfig = {}) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if(!el) return;

        const{
            speed = 0.5,
            direction = "up",
            start = "top bottom",
            end = "bottom top", 
            scrub = true,
        } = config;

        let yValue = 0;
        if(direction === "up") yValue = -100 * speed;
        if(direction === "down") yValue = 100 * speed;
        if(direction === "left" || direction === "right"){
            
        }

        const tween = gsap.to(el, {
            y: yValue,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub: typeof scrub === "number" ? scrub : 1,
            },
        });

        return () => {
            killTween(tween);
        };
    }, [JSON.stringify(config)]);

    return ref;
};

export const useSlideIn = (
    direction: "left" | "right" | "top" | "bottom",
    config: AnimationConfig = {}
) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if(!el) return;

        const {
            duration = 1,
            delay = 0,
            ease = "power2.out",
            once = true,
            start = "top 80%",
            end = "bottom 20%",
            scrub,
        } = config;

        const distance = 100;
        let initX = 0;
        let inity = 0;

        switch(direction){
            case "left":
                initX = -distance;
                break;
            case "right":
                initX = distance;
                break;
            case "top":
                inity = -distance;
                break;
            case "bottom":
                inity = distance;
                break;
        }
        gsap.set(el, {
            opacity: 0,
            x: initX,
            y: inity,
        });

        const tween = gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub,
                once,
                toggleActions: once
                    ? "play none none none"
                    : "play none none reverse",
            },
        });

        return () => {
            killTween(tween);
        };
    }, [direction, JSON.stringify(config)]);

    return ref;
};

export const useRotateIn = (config: AnimationConfig = {}) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if(!el) return;

        const {
            duration = 1,
            delay = 0,
            ease = "back.out(1.7)",
            once = true,
            start = "top 80%",
            end = "bottom 20%",
            scrub,
        } = config;

        gsap.set(el, {
            opacity: 0,
            rotation: -180,
            scale: 0.5,
        });

        const tween = gsap.to(el, {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub,
                once,
                toggleActions: once
                    ? "play none none none"
                    : "play none none reverse",
            },
        });

        return () => {
            killTween(tween);
        };
    }, [JSON.stringify(config)]);

    return ref;
};

export const usePageload = () => {
    useEffect(() => {
        gsap.set("[data-animate]", {opacity: 0});

        const tl = gsap.timeline();
        tl.to("[data-animate]", {
            opacity: 1,
            duration: 1,
            stagger: 1,
            ease: "power2.out",
        });

        return () => {
            tl.kill();
        };
    }, []);
};

export const useResponsiveAnimation = () => {
    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
}
