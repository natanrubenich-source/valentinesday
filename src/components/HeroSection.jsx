import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import preas from '../assets/preas.png';
import folha2 from '../assets/folha2.webp';
import folha3 from '../assets/folha3.webp';

const HeroSection = () => {
  const heroRef = useRef(null);
  const preasRef = useRef(null);
  const leafLeftRef = useRef(null);
  const leafRightRef = useRef(null);
  const heartsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const risingHeartsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        preasRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.7)', delay: 0.3 }
      );

      gsap.fromTo(
        leafLeftRef.current,
        { opacity: 0, x: -80, rotation: -30 },
        { opacity: 0.7, x: 0, rotation: -5, duration: 1.2, ease: 'power2.out', delay: 0.6 }
      );

      gsap.fromTo(
        leafRightRef.current,
        { opacity: 0, x: 80, rotation: 30 },
        { opacity: 0.7, x: 0, rotation: 5, duration: 1.2, ease: 'power2.out', delay: 0.8 }
      );

      heartsRef.current.forEach((heart, i) => {
        if (!heart) return;
        gsap.fromTo(
          heart,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 1 + i * 0.1 }
        );
        gsap.to(heart, {
          y: -10 + Math.random() * 20,
          x: -5 + Math.random() * 10,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      // Animação do título
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.5)', delay: 0.2 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
      );

      // Corações subindo continuamente
      risingHeartsRef.current.forEach((heart, i) => {
        if (!heart) return;
        const startX = Math.random() * 100;
        gsap.set(heart, {
          x: `${startX}vw`,
          y: '110vh',
          scale: 0.5 + Math.random() * 0.8,
          opacity: 0.4 + Math.random() * 0.4,
        });
        gsap.to(heart, {
          y: '-20vh',
          x: `+=${Math.random() * 40 - 20}`,
          rotation: Math.random() * 30 - 15,
          duration: 6 + Math.random() * 6,
          repeat: -1,
          delay: i * 0.8,
          ease: 'none',
          onRepeat: () => {
            gsap.set(heart, {
              x: `${Math.random() * 100}vw`,
              y: '110vh',
            });
          },
        });
      });
    }, heroRef);

    const handleMove = (clientX, clientY) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(preasRef.current, {
        x: xPercent * 15,
        y: yPercent * 10,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(leafLeftRef.current, {
        x: xPercent * 30,
        y: yPercent * 25,
        rotation: -5 + xPercent * 10,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(leafRightRef.current, {
        x: xPercent * -30,
        y: yPercent * -25,
        rotation: 5 + xPercent * -10,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const floatingHearts = [
    { top: '10%', left: '5%', size: 'text-3xl' },
    { top: '15%', right: '8%', size: 'text-4xl' },
    { top: '25%', left: '12%', size: 'text-2xl' },
    { top: '20%', right: '15%', size: 'text-2xl' },
    { bottom: '25%', left: '8%', size: 'text-3xl' },
    { bottom: '20%', right: '5%', size: 'text-4xl' },
    { bottom: '35%', left: '3%', size: 'text-2xl' },
    { bottom: '30%', right: '12%', size: 'text-3xl' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #f0f4f0 100%)',
      }}
    >
      <img
        ref={leafLeftRef}
        src={folha2}
        alt=""
        className="absolute left-0 top-1/3 w-20 md:w-32 opacity-50 -translate-x-1/4"
      />
      <img
        ref={leafRightRef}
        src={folha3}
        alt=""
        className="absolute right-0 top-1/4 w-16 md:w-28 opacity-50 translate-x-1/4"
      />

      {floatingHearts.map((heart, i) => (
        <span
          key={i}
          ref={(el) => (heartsRef.current[i] = el)}
          className={`absolute ${heart.size} text-red-500 opacity-80`}
          style={{
            top: heart.top,
            bottom: heart.bottom,
            left: heart.left,
            right: heart.right,
            filter: 'drop-shadow(0 2px 4px rgba(220, 38, 38, 0.3))',
          }}
        >
          ❤️
        </span>
      ))}

      {/* Corações subindo */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={`rising-${i}`}
          ref={(el) => (risingHeartsRef.current[i] = el)}
          className="fixed text-2xl md:text-3xl pointer-events-none"
          style={{
            color: i % 3 === 0 ? '#f87171' : i % 3 === 1 ? '#fb7185' : '#fda4af',
            zIndex: 5,
          }}
        >
          ❤️
        </span>
      ))}

      <div className="relative z-20 text-center max-w-lg mx-auto flex flex-col items-center">
        {/* Título principal */}
        <h1
          ref={titleRef}
          className="script-font text-4xl md:text-6xl text-[#c41e3a] mb-2"
          style={{
            textShadow: '2px 2px 4px rgba(196, 30, 58, 0.2)',
          }}
        >
          Feliz Dia dos Namorados
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-500 mb-6"
        >
          14 de Fevereiro de 2026
        </p>

        <img
          ref={preasRef}
          src={preas}
          alt="Preás apaixonadas"
          className="w-80 md:w-[28rem] mx-auto mb-6 rounded-2xl"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
          }}
        />

        <div className="flex justify-center gap-3 mb-4">
          <span className="text-3xl">🇧🇷</span>
          <span className="text-red-500 text-3xl animate-pulse">❤️</span>
          <span className="text-3xl">🇵🇹</span>
        </div>

        <p className="text-lg md:text-xl text-gray-600 italic text-center px-4">
          Para a minha princesa, o amor da minha vida. Espero que goste.
        </p>

        <div className="flex justify-center gap-2 mt-4">
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0s' }}>💕</span>
          <span className="text-3xl animate-pulse" style={{ animationDelay: '0.2s' }}>💖</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>💕</span>
        </div>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-[#2d5a3d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;
