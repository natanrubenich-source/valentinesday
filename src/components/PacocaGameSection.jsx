import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import moreninha from '../assets/moreninha_do_rio.png';
import preaPassaporte from '../assets/prea_femea_passaport.png';
import pacocaRolha from '../assets/pacoca-rolha-15g.png';

const PacocaGameSection = () => {
  const [clicks, setClicks] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const winImageRef = useRef(null);
  const pacocasRef = useRef([]);
  const heartsRef = useRef([]);
  const titleRef = useRef(null);
  const counterRef = useRef(null);

  const CLICKS_TO_WIN = 30;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.5)', delay: 0.2 }
      );

      // Paçocas subindo
      pacocasRef.current.forEach((pacoca, i) => {
        if (!pacoca) return;
        const startX = Math.random() * 100;
        gsap.set(pacoca, {
          x: `${startX}%`,
          y: '120%',
          scale: 0.5 + Math.random() * 0.5,
          opacity: 0.7 + Math.random() * 0.3,
          rotation: Math.random() * 30 - 15,
        });
        gsap.to(pacoca, {
          y: '-20%',
          x: `+=${Math.random() * 40 - 20}`,
          rotation: `+=${Math.random() * 90 - 45}`,
          duration: 10 + Math.random() * 8,
          repeat: -1,
          delay: i * 0.5,
          ease: 'none',
          onRepeat: () => {
            gsap.set(pacoca, {
              x: `${Math.random() * 100}%`,
              y: '120%',
            });
          },
        });
      });

      // Corações flutuantes
      heartsRef.current.forEach((heart, i) => {
        if (!heart) return;
        gsap.to(heart, {
          y: -12 + Math.random() * 24,
          scale: 1 + Math.random() * 0.2,
          duration: 2.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    if (completed) return;

    const newClicks = clicks + 1;
    setClicks(newClicks);

    // Animação de tremor forte na imagem
    const shakeTimeline = gsap.timeline();
    shakeTimeline
      .to(imageRef.current, { x: -8, rotation: -3, duration: 0.05 })
      .to(imageRef.current, { x: 8, rotation: 3, duration: 0.05 })
      .to(imageRef.current, { x: -6, rotation: -2, duration: 0.05 })
      .to(imageRef.current, { x: 6, rotation: 2, duration: 0.05 })
      .to(imageRef.current, { x: -4, rotation: -1, duration: 0.05 })
      .to(imageRef.current, { x: 0, rotation: 0, scale: 1.05, duration: 0.05 })
      .to(imageRef.current, { scale: 1, duration: 0.1 });

    // Animação do contador
    gsap.fromTo(
      counterRef.current,
      { scale: 1.3, color: '#c41e3a' },
      { scale: 1, color: '#d4a574', duration: 0.3, ease: 'back.out(2)' }
    );

    if (newClicks >= CLICKS_TO_WIN) {
      setShowExplosion(true);
      
      // Animação de explosão
      gsap.to(imageRef.current, {
        scale: 2.5,
        opacity: 0,
        rotation: 720,
        duration: 1,
        ease: 'power2.in',
        onComplete: () => {
          setCompleted(true);
          setShowExplosion(false);
          
          // Animação da imagem de vitória
          gsap.fromTo(
            winImageRef.current,
            { scale: 0, opacity: 0, rotation: -180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' }
          );
        },
      });
    }
  };

  const hearts = [
    { top: '8%', left: '5%', size: 'text-4xl' },
    { top: '12%', right: '8%', size: 'text-5xl' },
    { bottom: '18%', left: '4%', size: 'text-3xl' },
    { bottom: '12%', right: '6%', size: 'text-4xl' },
    { top: '35%', left: '2%', size: 'text-3xl' },
    { top: '40%', right: '3%', size: 'text-3xl' },
    { bottom: '35%', left: '8%', size: 'text-2xl' },
    { bottom: '40%', right: '10%', size: 'text-2xl' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #ffffff 0%, #fff8f0 30%, #fff8f0 70%, #ffffff 100%)',
      }}
    >
      {/* Paçocas subindo */}
      {Array.from({ length: 15 }).map((_, i) => (
        <img
          key={`pacoca-${i}`}
          ref={(el) => (pacocasRef.current[i] = el)}
          src={pacocaRolha}
          alt=""
          className="absolute w-12 md:w-20 pointer-events-none"
          style={{ zIndex: 5 }}
        />
      ))}

      {/* Corações decorativos */}
      {hearts.map((heart, i) => (
        <span
          key={i}
          ref={(el) => (heartsRef.current[i] = el)}
          className={`absolute ${heart.size} text-red-400 opacity-40`}
          style={{ top: heart.top, bottom: heart.bottom, left: heart.left, right: heart.right }}
        >
          ❤️
        </span>
      ))}

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Título */}
        <div ref={titleRef}>
          <h2 className="script-font text-4xl md:text-6xl text-[#c41e3a] mb-2">
            Jogo da Paçoca
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-6">
            Um desafio especial para você! 🥜
          </p>
        </div>

        {/* Card do jogo */}
        <div 
          className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-orange-100"
          style={{
            boxShadow: '0 25px 60px rgba(212, 165, 116, 0.2), 0 10px 30px rgba(0, 0, 0, 0.08)',
          }}
        >
          <p className="text-gray-700 text-lg md:text-xl mb-4 font-medium">
            {completed ? '🎉 Você conseguiu! 🎉' : 'Clique na paçoca!'}
          </p>

          {/* Contador de cliques */}
          <div className="mb-8">
            <div 
              ref={counterRef}
              className="inline-block bg-gradient-to-r from-orange-100 to-yellow-100 px-6 py-3 rounded-full"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#d4a574]">
                {clicks}
              </span>
              <span className="text-lg md:text-xl text-[#d4a574] ml-2">
                {clicks === 1 ? 'clique' : 'cliques'}
              </span>
            </div>
          </div>

          {/* Área do jogo */}
          <div className="relative min-h-[280px] md:min-h-[350px] flex items-center justify-center">
            {!completed && (
              <div
                ref={imageRef}
                onClick={handleClick}
                className="cursor-pointer select-none transform-gpu flex flex-col items-center"
                style={{ transformOrigin: 'center center' }}
              >
                <img
                  src={moreninha}
                  alt="Paçoca Moreninha do Rio"
                  className="w-64 md:w-80 hover:brightness-105 active:brightness-95 transition-all"
                  style={{
                    filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.25))',
                  }}
                  draggable={false}
                />
                <p className="text-sm text-gray-400 mt-4 animate-pulse">
                  👆 Toque aqui!
                </p>
              </div>
            )}

            {/* Explosão */}
            {showExplosion && (
              <div className="absolute inset-0 flex items-center justify-center">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-5xl animate-ping"
                    style={{
                      transform: `rotate(${i * 22.5}deg) translateY(-120px)`,
                      animationDelay: `${i * 0.03}s`,
                    }}
                  >
                    🥜
                  </span>
                ))}
              </div>
            )}

            {/* Imagem de vitória */}
            {completed && (
              <div ref={winImageRef} className="text-center flex flex-col items-center">
                <img
                  src={preaPassaporte}
                  alt="Preá com passaporte brasileiro"
                  className="w-56 md:w-72 mb-6"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25))',
                  }}
                />
                <h3 className="script-font text-3xl md:text-5xl text-[#2d5a3d] mb-3">
                  Parabéns!
                </h3>
                <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
                  Você se tornou uma BR! 🇧🇷
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🎉</span>
                  <span className="text-4xl animate-bounce" style={{ animationDelay: '0.1s' }}>🥜</span>
                  <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🇧🇷</span>
                  <span className="text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>❤️</span>
                  <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {!completed && (
          <p className="text-sm text-gray-400 mt-8 italic">
            Continue clicando... você consegue! 💪
          </p>
        )}
      </div>
    </section>
  );
};

export default PacocaGameSection;
