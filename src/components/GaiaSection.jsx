import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import gaia1 from '../assets/gaia1.png';
import gaia2 from '../assets/gaia2.png';

gsap.registerPlugin(ScrollTrigger);

const GaiaSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const gaiaRef = useRef(null);
  const gaia2Ref = useRef(null);
  const heartsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        gaiaRef.current,
        { opacity: 0, scale: 0.5, x: -50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        gaia2Ref.current,
        { opacity: 0, scale: 0.5, x: 50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.to(gaiaRef.current, {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(gaia2Ref.current, {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      heartsRef.current.forEach((heart, i) => {
        if (!heart) return;
        gsap.to(heart, {
          y: -8 + Math.random() * 16,
          scale: 1 + Math.random() * 0.2,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hearts = [
    { top: '15%', left: '10%', size: 'text-2xl' },
    { top: '20%', right: '12%', size: 'text-3xl' },
    { bottom: '25%', left: '15%', size: 'text-2xl' },
    { bottom: '20%', right: '10%', size: 'text-3xl' },
    { top: '40%', left: '5%', size: 'text-xl' },
    { top: '45%', right: '8%', size: 'text-xl' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f0f4f0 0%, #00cd88 15%, #00cd88 85%, #ffffff 100%)',
      }}
    >
      {hearts.map((heart, i) => (
        <span
          key={i}
          ref={(el) => (heartsRef.current[i] = el)}
          className={`absolute ${heart.size} text-red-400 opacity-60`}
          style={{ top: heart.top, bottom: heart.bottom, left: heart.left, right: heart.right }}
        >
          ❤️
        </span>
      ))}

      <div className="max-w-lg mx-auto text-center z-10 px-6">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg"
        >
          Abençoados por
          <br />
          <span className="script-font text-4xl md:text-6xl text-white">Gaia</span>
        </h2>

        <div className="flex justify-center items-center gap-6 mb-8">
          <img
            ref={gaiaRef}
            src={gaia1}
            alt="Deusa Gaia"
            className="w-28 md:w-36"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(45, 90, 61, 0.3))' }}
          />
          <span className="text-4xl text-red-500">❤️</span>
          <img
            ref={gaia2Ref}
            src={gaia2}
            alt="Deusa Gaia"
            className="w-28 md:w-36"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(45, 90, 61, 0.3))' }}
          />
        </div>

        <div ref={textRef} className="space-y-4">
          <p className="text-lg md:text-xl italic leading-relaxed text-white/90 drop-shadow">
            "Assim como Gaia abraça a Terra com amor infinito,
            nosso amor transcende fronteiras e oceanos."
          </p>
          <p className="text-base md:text-lg text-white/80">
            A deusa da natureza e da vida nos conecta através da essência
            mais pura do universo — o amor verdadeiro.
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-6">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 mx-auto backdrop-blur-sm">
              <span className="text-2xl">🌿</span>
            </div>
            <span className="text-sm text-white/80">Natureza</span>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 mx-auto backdrop-blur-sm">
              <span className="text-2xl">❤️</span>
            </div>
            <span className="text-sm text-white/80">Amor</span>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 mx-auto backdrop-blur-sm">
              <span className="text-2xl">✨</span>
            </div>
            <span className="text-sm text-white/80">Eternidade</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default GaiaSection;
