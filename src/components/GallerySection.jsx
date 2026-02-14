import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ela1 from '../assets/img/ela1.jpeg';
import ela2 from '../assets/img/ela2.jpeg';
import ela3 from '../assets/img/ela3.jpeg';
import ela4 from '../assets/img/ela4.jpeg';
import eu from '../assets/img/eu.jpeg';

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: ela1, alt: 'Ela', delay: 0 },
  { src: ela2, alt: 'Ela', delay: 0.1 },
  { src: eu, alt: 'Eu', delay: 0.2 },
  { src: ela3, alt: 'Ela', delay: 0.3 },
  { src: ela4, alt: 'Ela', delay: 0.4 },
];

const GallerySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const photosRef = useRef([]);
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

      photosRef.current.forEach((photo, index) => {
        if (!photo) return;
        
        gsap.fromTo(
          photo,
          { 
            opacity: 0, 
            scale: 0.8, 
            y: 60,
            rotation: index % 2 === 0 ? -8 : 8 
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: index % 2 === 0 ? -2 : 2,
            duration: 0.8,
            delay: index * 0.12,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      heartsRef.current.forEach((heart, i) => {
        if (!heart) return;
        gsap.to(heart, {
          y: -10 + Math.random() * 20,
          scale: 1 + Math.random() * 0.3,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hearts = [
    { top: '10%', left: '8%', size: 'text-3xl' },
    { top: '15%', right: '10%', size: 'text-4xl' },
    { top: '50%', left: '5%', size: 'text-2xl' },
    { top: '55%', right: '6%', size: 'text-3xl' },
    { bottom: '15%', left: '12%', size: 'text-2xl' },
    { bottom: '10%', right: '8%', size: 'text-3xl' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-8 pt-32 pb-20"
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      {hearts.map((heart, i) => (
        <span
          key={i}
          ref={(el) => (heartsRef.current[i] = el)}
          className={`absolute ${heart.size} text-red-400 opacity-50`}
          style={{ top: heart.top, bottom: heart.bottom, left: heart.left, right: heart.right }}
        >
          ❤️
        </span>
      ))}

      <h2
        ref={titleRef}
        className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#2d5a3d]"
      >
        Nossos
        <br />
        <span className="script-font text-4xl md:text-6xl text-[#4a7c59]">Momentos</span>
      </h2>

      <div className="flex justify-center gap-2 mb-8">
        <span className="text-2xl">❤️</span>
        <span className="text-3xl">❤️</span>
        <span className="text-2xl">❤️</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {photos.map((photo, index) => (
          <div
            key={index}
            ref={(el) => (photosRef.current[index] = el)}
            className={`relative overflow-hidden rounded-xl ${
              index === 2 ? 'col-span-2 md:col-span-1' : ''
            }`}
            style={{
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="text-white text-2xl">❤️</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-gray-500 text-lg italic max-w-md">
        "Cada foto guarda um pedaço da nossa história, 
        cada momento é uma eternidade ao seu lado."
      </p>
    </section>
  );
};

export default GallerySection;
