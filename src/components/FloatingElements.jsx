import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import folha2 from '../assets/folha2.webp';
import folha3 from '../assets/folha3.webp';

const FloatingElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const leaves = containerRef.current.querySelectorAll('.floating-leaf');
    const hearts = containerRef.current.querySelectorAll('.floating-heart');

    leaves.forEach((leaf, index) => {
      gsap.set(leaf, {
        x: Math.random() * window.innerWidth,
        y: -100 - Math.random() * 200,
        rotation: Math.random() * 360,
        scale: 0.2 + Math.random() * 0.3,
      });

      gsap.to(leaf, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 150 - 75}`,
        rotation: `+=${Math.random() * 540 - 270}`,
        duration: 12 + Math.random() * 8,
        repeat: -1,
        delay: index * 2,
        ease: 'none',
        onRepeat: () => {
          gsap.set(leaf, {
            x: Math.random() * window.innerWidth,
            y: -100,
          });
        },
      });
    });

    hearts.forEach((heart, index) => {
      gsap.set(heart, {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        scale: 0.8 + Math.random() * 0.5,
        opacity: 0.5 + Math.random() * 0.3,
      });

      gsap.to(heart, {
        y: -100,
        x: `+=${Math.random() * 80 - 40}`,
        rotation: `+=${Math.random() * 30 - 15}`,
        duration: 8 + Math.random() * 6,
        repeat: -1,
        delay: index * 1.2,
        ease: 'none',
        onRepeat: () => {
          gsap.set(heart, {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          });
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {[folha2, folha3, folha2].map((src, i) => (
        <img
          key={`leaf-${i}`}
          src={src}
          alt=""
          className="floating-leaf absolute w-10 h-10 md:w-14 md:h-14 object-contain opacity-40"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={`heart-${i}`}
          className="floating-heart absolute text-xl md:text-2xl"
          style={{ 
            color: i % 3 === 0 ? '#f87171' : i % 3 === 1 ? '#fb7185' : '#fda4af',
            filter: 'drop-shadow(0 2px 4px rgba(244, 63, 94, 0.3))',
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default FloatingElements;
