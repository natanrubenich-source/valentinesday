import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LoveLetterSection = () => {
  const sectionRef = useRef(null);
  const envelopeRef = useRef(null);
  const letterRef = useRef(null);
  const linesRef = useRef([]);
  const heartsRef = useRef([]);
  const decorRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        envelopeRef.current,
        { opacity: 0, scale: 0.8, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        letterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      linesRef.current.forEach((line, index) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.6 + index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      heartsRef.current.forEach((heart, i) => {
        if (!heart) return;
        gsap.to(heart, {
          y: -15 + Math.random() * 30,
          x: -10 + Math.random() * 20,
          rotation: -10 + Math.random() * 20,
          scale: 1 + Math.random() * 0.3,
          duration: 2.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      decorRef.current.forEach((dec, i) => {
        if (!dec) return;
        gsap.to(dec, {
          y: -5 + Math.random() * 10,
          rotation: -5 + Math.random() * 10,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const floatingHearts = [
    { top: '8%', left: '5%', size: 'text-3xl' },
    { top: '12%', right: '8%', size: 'text-4xl' },
    { top: '25%', left: '3%', size: 'text-2xl' },
    { top: '30%', right: '5%', size: 'text-3xl' },
    { bottom: '30%', left: '6%', size: 'text-3xl' },
    { bottom: '25%', right: '4%', size: 'text-4xl' },
    { bottom: '15%', left: '10%', size: 'text-2xl' },
    { bottom: '10%', right: '12%', size: 'text-3xl' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f8f9fa 0%, #fff5f5 30%, #ffe4e6 70%, #fecdd3 100%)',
      }}
    >
      {floatingHearts.map((heart, i) => (
        <span
          key={i}
          ref={(el) => (heartsRef.current[i] = el)}
          className={`absolute ${heart.size} opacity-60`}
          style={{ 
            top: heart.top, 
            bottom: heart.bottom, 
            left: heart.left, 
            right: heart.right,
            color: '#f87171',
          }}
        >
          ❤️
        </span>
      ))}

      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#2d5a3d]">
        <span className="script-font text-4xl md:text-6xl">Carta de Amor</span>
      </h2>

      <div className="flex justify-center gap-3 mb-6">
        <span className="text-2xl">💕</span>
        <span className="text-3xl">💖</span>
        <span className="text-2xl">💕</span>
      </div>

      <div
        ref={envelopeRef}
        className="relative max-w-sm w-full mx-4"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="absolute -top-4 -left-4 w-16 h-16 opacity-20"
          ref={(el) => (decorRef.current[0] = el)}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-red-400">
            <path fill="currentColor" d="M50 88.9L44.2 83.5C20.8 62.3 5 48.2 5 30.9C5 16.8 16.3 5.5 30.4 5.5C38.4 5.5 46.1 9.2 50 15.1C53.9 9.2 61.6 5.5 69.6 5.5C83.7 5.5 95 16.8 95 30.9C95 48.2 79.2 62.3 55.8 83.5L50 88.9Z"/>
          </svg>
        </div>
        <div 
          className="absolute -top-3 -right-3 w-12 h-12 opacity-20"
          ref={(el) => (decorRef.current[1] = el)}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-red-400">
            <path fill="currentColor" d="M50 88.9L44.2 83.5C20.8 62.3 5 48.2 5 30.9C5 16.8 16.3 5.5 30.4 5.5C38.4 5.5 46.1 9.2 50 15.1C53.9 9.2 61.6 5.5 69.6 5.5C83.7 5.5 95 16.8 95 30.9C95 48.2 79.2 62.3 55.8 83.5L50 88.9Z"/>
          </svg>
        </div>

        <div
          ref={letterRef}
          className="relative p-8 md:p-10 rounded-2xl border-2 border-red-100"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #fff9f9 50%, #fff5f5 100%)',
            boxShadow: '0 20px 50px rgba(244, 63, 94, 0.15), 0 8px 25px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg">
              <span className="text-3xl">💌</span>
            </div>
          </div>

          <div className="absolute top-4 left-4 flex gap-1">
            <span className="text-lg opacity-40">❤️</span>
            <span className="text-sm opacity-30">❤️</span>
          </div>
          <div className="absolute top-4 right-4 flex gap-1">
            <span className="text-sm opacity-30">❤️</span>
            <span className="text-lg opacity-40">❤️</span>
          </div>

          <div className="mt-10 space-y-3">
            <p 
              ref={(el) => (linesRef.current[0] = el)}
              className="script-font text-2xl text-rose-500 mb-3"
            >
              Meu amor,
            </p>

            <p 
              ref={(el) => (linesRef.current[1] = el)}
              className="text-gray-700 text-base leading-relaxed"
            >
              Do <span className="font-semibold text-green-600">Brasil</span> a <span className="font-semibold text-red-600">Portugal</span>, nosso amor cruzou o Atlântico.
            </p>

            <p 
              ref={(el) => (linesRef.current[2] = el)}
              className="text-gray-700 text-base leading-relaxed"
            >
              Você é minha <span className="text-[#2d5a3d] font-semibold">Gaia</span>, a força que me conecta à terra, a natureza que me faz respirar.
            </p>

            <div className="flex justify-center py-1">
              <span ref={(el) => (linesRef.current[3] = el)} className="text-xl">💚</span>
            </div>

            <p 
              ref={(el) => (linesRef.current[4] = el)}
              className="text-gray-700 text-base leading-relaxed"
            >
              Neste <span className="text-rose-500 font-semibold">Dia dos Namorados</span>, celebro cada momento ao seu lado, cada risada compartilhada, cada sonho que construímos juntos.
            </p>

            <p 
              ref={(el) => (linesRef.current[7] = el)}
              className="text-gray-700 text-base leading-relaxed"
            >
              Me sinto o homem mais sortudo do mundo ao estar do seu lado, tu me inspira e me motiva a fazer de tudo para estar contigo. Quero que saiba que te amo muitão!
            </p>

            <div className="pt-3 border-t border-red-100 mt-3">
              <p 
                ref={(el) => (linesRef.current[5] = el)}
                className="text-lg font-bold text-rose-500 text-center"
              >
                Te amo mais que ontem e menos que amanhã! ❤️
              </p>
            </div>

            <p 
              ref={(el) => (linesRef.current[6] = el)}
              className="script-font text-xl text-[#2d5a3d] text-right mt-3"
            >
              — Seu amor brasileiro 🇧🇷
            </p>
          </div>

          <div className="absolute -bottom-3 -right-3 w-20 h-20 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400">
              <path fill="currentColor" d="M50 88.9L44.2 83.5C20.8 62.3 5 48.2 5 30.9C5 16.8 16.3 5.5 30.4 5.5C38.4 5.5 46.1 9.2 50 15.1C53.9 9.2 61.6 5.5 69.6 5.5C83.7 5.5 95 16.8 95 30.9C95 48.2 79.2 62.3 55.8 83.5L50 88.9Z"/>
            </svg>
          </div>
          <div className="absolute -bottom-2 -left-2 w-14 h-14 opacity-15">
            <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400">
              <path fill="currentColor" d="M50 88.9L44.2 83.5C20.8 62.3 5 48.2 5 30.9C5 16.8 16.3 5.5 30.4 5.5C38.4 5.5 46.1 9.2 50 15.1C53.9 9.2 61.6 5.5 69.6 5.5C83.7 5.5 95 16.8 95 30.9C95 48.2 79.2 62.3 55.8 83.5L50 88.9Z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-4 items-center">
        <span className="text-4xl">🇧🇷</span>
        <div className="flex gap-1">
          <span className="text-2xl animate-pulse">❤️</span>
          <span className="text-3xl animate-bounce">💕</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>❤️</span>
        </div>
        <span className="text-4xl">🇵🇹</span>
      </div>
    </section>
  );
};

export default LoveLetterSection;
