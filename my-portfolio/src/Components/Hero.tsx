import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const fullText = 'HITAYEZU Frank Duff';
    const nickname = 'dojdev';

    const heroRef = useRef<HTMLElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const buttonsRef = useRef<HTMLDivElement | null>(null);
    const particlesRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
    let idx = 0;
    const timeouts: number[] = [];

    const step = () => {
        if(idx < fullText.length){
            setDisplayText(fullText.slice(0, idx + 1));
            idx +=1;
            const id = window.setTimeout(step, 100);
            timeouts.push(id);
        }
    };
    step();

    const cursorInterval = window.setInterval(() =>{
        setShowCursor((prev) => !prev);
    }, 500);

    return () => {
        timeouts.forEach(clearTimeout);
        clearInterval(cursorInterval);
    };
 }, [fullText]);

 useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() =>{
        gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
            opacity: 0,
            y: 50,
            scale: 0.8,
        });

        if(particlesRef.current) {
            gsap.set(particlesRef.current.children, {
                opacity: 0,
                scale: 0.8
            });
        }

        //background parallax
        if(backgroundRef.current){
            gsap.to(backgroundRef.current, {
                y: -100,
                ease: "none", 
                scrollTrigger: {
                    trigger: heroRef.current!,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }

        const tl = gsap.timeline();

        //particles in
        if(particlesRef.current){
            tl.to(particlesRef.current.children, {
                opacity: 1,
                scale: 1,
                duration: 2,
                stagger: 0.02,
                ease: "power2.out",
            });
        }

        //Title / subtitle / buttons
        tl.to(
            titleRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: "back.out(1.7)",
            },
            "-=1"
        )
        .to(
            subtitleRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
            },
            "-=0.5"
        )
        .to(
            buttonsRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
            },
            "-=0.3"
        );
    }, heroRef);

    //cleanup of all scrolltriggers from gsap created
    return () => ctx.revert();
 }, []);

 return(
    <section 
    ref={heroRef}
    className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid"
    >
        {/* animated background particles */}
        <div ref={backgroundRef} className="absolute inset-0">
            <div ref={particlesRef} className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyber-blue rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    />
                ))}
            </div>
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-4">
            {/* Main name with glithc effect */}
            <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-cyber font-black mb-4 relative"
            >
                <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent glow-text">
                    {displayText}
                    {showCursor && <span className="animate-pulse">|</span>}
                </span>
                {/*glitch layers */}
                <span
                className="absolute inset-0 bg-gradient-to-r from-cyber-pink via-cyber-green to-cyber-blue bg-clip-text text-transparent opacity-30 animate-glitch"
                style={{ animationDelay: "0.2s"}}
                >
                    {displayText}
                </span>
            </h1>
            {/* Nickname or aka*/}
            <div className="mb-8">
                <span className="text-lg md:text-xl text-cyber-green font-tech font-light">aka</span>
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-cyber font-bold text-cyber-blue glow-text animate-pulse-neon rounded-full">
                    {nickname}
                </h2>
            </div>

            {/*subtitle*/}
            <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 font-tech mb-12"
            >junior Full-Stakc Developer . Creative Technologist . Problem Solver</p>
            {/*animated CTA buttons*/}
            <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center"
            >
                <a href="#skills" className="cyber-button">view My Work</a>
                <a href="#contact" className="relative px-6 py-3 font-tech font-bold text-cyber-blue border-2 border-cyber-blue rounded-lg hover:bg-cyber-blue hover:text-cyber-dark transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                    Get In Touch
                </a>
            </div>

            {/*Floating geometric shpapes*/}
            <div
            className="absolute top-20 left-10 w-20 h-20 border border-cyber-purple opacity-30 animate-float"
            style={{ animationDelay: "1s"}}
            >
                <div className="w-full h-full border border-cyber-blue transform rotate-45"/>
            </div>
            <div
            className="absolute bottom-20 right-10 w-16 h-16 border border-cyber-green opacity-40 animate-float"
            style={{animationDelay: "2s"}}
            >
                <div className="w-full h-full bg-gradient-to-br from-cyber-pink to-transparent rounded-full"/>
            </div>
        </div>

        {/*scroll indicator*/}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyber-blue rounded-full mt-2 animate-pulse" ></div>
        </div>
        </div>
    </section>
 );
};

export default Hero;