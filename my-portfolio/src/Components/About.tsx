import {User, Code, Palette, Zap, icons} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { title } from 'framer-motion/client';
import { head } from 'node_modules/axios/index.d.cts';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const timelineItems = [
        {
            year: 'late 2024',
            title: 'Started Coding journey', 
            description: 'Began learning programming fundamentals and web development',
            icon: Code
        },
        {
            year: 'early 2025',
            title: 'Frontend Development',
            description: 'Built solid foundation in React, HTML, CSS and development',
            icon: Code
        },
        {
            year: 'mid 2025',
            title: 'Building & Creating',
            description: 'Developing projects and expanding technical skills',
            icon: User
        }
    ];

    useEffect(() => {
        if(!sectionRef.current || !profileRef.current || !timelineRef.current || !headerRef.current) return;

        gsap.set(headerRef.current, { opacity: 0, y: 50});
        gsap.set(profileRef.current, {opacity: 0, x: -100});
        gsap.set(timelineRef.current, {opacity: 0, x: 100});

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                once: true
            }
        });

        tl.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        });
        tl.to([profileRef.current, timelineRef.current], {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power2.out'
        }, '-=0.5');

        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        if(timelineItems.length > 0){
            gsap.set(timelineItems, {opacity: 0, y: 30});

            tl.to(timelineItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            }, '-=0.3');
        }

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if(trigger.trigger === sectionRef.current){
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-4 relative" id="about">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div ref={headerRef} className="text-center mb-16">
                    <h2 className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent glow-text">
                        About Me
                    </h2>
                </div>
            </div>
        </section>
    )
}