import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const heartsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
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

  return (
    <footer
      ref={sectionRef}
      className="relative py-16 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fecdd3 0%, #ffffff 50%, #f0f4f0 100%)',
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          ref={(el) => (heartsRef.current[i] = el)}
          className="absolute text-2xl text-red-300 opacity-40"
          style={{
            top: `${20 + i * 15}%`,
            left: i % 2 === 0 ? '8%' : undefined,
            right: i % 2 === 1 ? '8%' : undefined,
          }}
        >
          ❤️
        </span>
      ))}

      <div ref={contentRef} className="max-w-md mx-auto text-center">
        <div className="flex justify-center gap-2 mb-4">
          <span className="text-3xl">❤️</span>
          <span className="text-4xl">💕</span>
          <span className="text-3xl">❤️</span>
        </div>

        <p className="script-font text-3xl md:text-4xl text-[#2d5a3d] mb-4">
          Feliz Dia dos Namorados
        </p>

        <p className="text-gray-500 text-sm mb-6">
          14 de Fevereiro de 2026
        </p>

        <div className="flex justify-center gap-3 mb-8">
          <span className="text-2xl">🇧🇷</span>
          <span className="text-red-400 text-xl">❤️</span>
          <span className="text-2xl">🇵🇹</span>
        </div>

        <p className="text-[#2d5a3d] text-sm">
          Feito com muito amor 💚
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-400 text-xs italic">
            "O amor é a única força capaz de transformar um inimigo em amigo."
            <br />
            — Martin Luther King Jr.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
