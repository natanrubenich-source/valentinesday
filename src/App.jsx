import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FloatingElements from './components/FloatingElements';
import HeroSection from './components/HeroSection';
import GaiaSection from './components/GaiaSection';
import GallerySection from './components/GallerySection';
import PacocaGameSection from './components/PacocaGameSection';
import LoveLetterSection from './components/LoveLetterSection';
import FooterSection from './components/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative">
      <FloatingElements />
      <main>
        <HeroSection />
        <GaiaSection />
        <GallerySection />
        <PacocaGameSection />
        <LoveLetterSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
