import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Brand {
  name: string;
  logo: string;
}

const BrandsSection: React.FC = () => {
  // Todas las marcas unificadas
  const allBrands: Brand[] = [
    { name: "Michelin", logo: "/images/brands/MICHELIN.webp" },
    { name: "Motul", logo: "/images/brands/MOTUL.webp" },
    { name: "Promoto", logo: "/images/brands/PROMOTO.webp" },
    { name: "Kenda", logo: "/images/brands/KENDA.webp" },
    { name: "AGU", logo: "/images/brands/AGU.webp" },
    { name: "Dynavolt", logo: "/images/brands/DYNAVOLT.webp" },
    { name: "Grimaldi", logo: "/images/brands/GRIMALDI.webp" },
    { name: "Alpinestars", logo: "/images/brands/ALPINESTARS.webp" },
    { name: "S2", logo: "/images/brands/LS2.webp" },
    { name: "R7", logo: "/images/brands/R7.webp" },
    { name: "Kohl", logo: "/images/brands/KOHL.webp" },
    { name: "Shad", logo: "/images/brands/SHAD.webp" },
    { name: "NGK", logo: "/images/brands/NGK.webp" },
    { name: "OSAK", logo: "/images/brands/OSAKA.webp" },
    { name: "Stallion", logo: "/images/brands/STALLION.webp" },
    { name: "Vipal", logo: "/images/brands/VIPAL.webp" }
  ];

  // Duplicar para loop infinito seamless - Solo 2 copias para mejor performance
  const tickerBrands = [...allBrands, ...allBrands];

  // Referencias y estados
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);

  // Hook personalizado para swipe
  const useSwipe = () => {
    const handleStart = useCallback((clientX: number) => {
      // Capturar la posición actual antes de iniciar el drag
      if (trackRef.current) {
        const computedStyle = window.getComputedStyle(trackRef.current);
        const matrix = computedStyle.transform;
        if (matrix && matrix !== 'none') {
          const values = matrix.match(/matrix.*\((.+)\)/)?.[1].split(', ');
          if (values && values.length >= 6) {
            setCurrentTranslateX(parseFloat(values[4]));
          }
        }
      }
      
      setIsDragging(true);
      setStartPosition(clientX);
      setIsAnimationPaused(true);
    }, []);

    const handleMove = useCallback((clientX: number) => {
      if (!isDragging) return;
      const deltaX = clientX - startPosition;
      setDragOffset(deltaX);
    }, [isDragging, startPosition]);

    const handleEnd = useCallback(() => {
      if (!isDragging) return;
      
      // Actualizar la posición base con el offset del drag
      setCurrentTranslateX(prev => prev + dragOffset);
      setIsDragging(false);
      setDragOffset(0);
      
      // Reanudar animación después de 1 segundo
      setTimeout(() => {
        setIsAnimationPaused(false);
      }, 1000);
    }, [isDragging, dragOffset]);

    return { handleStart, handleMove, handleEnd };
  };

  const { handleStart, handleMove, handleEnd } = useSwipe();

  // Event listeners para mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Event listeners para touch
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  // Animación personalizada con RAF - Loop infinito seamless
  useEffect(() => {
    let startTime: number | null = null;
    const speed = 0.08; // velocidad más lenta para mejor visibilidad
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      
      if (!isAnimationPaused && !isDragging && trackRef.current) {
        const elapsed = currentTime - startTime;
        const newPosition = currentTranslateX - (elapsed * speed);
        
        // Calcular el ancho exacto de un conjunto completo de marcas
        const itemWidth = 200; // ancho estimado más generoso (logo + margins)
        const singleSetWidth = allBrands.length * itemWidth;
        
        // Reset seamless: cuando se mueve exactamente el ancho de un conjunto
        if (Math.abs(newPosition) >= singleSetWidth) {
          // Reset sin salto visible - simplemente ajustar la posición base
          setCurrentTranslateX(newPosition % singleSetWidth);
          startTime = currentTime; // Reiniciar tiempo
        } else {
          setCurrentTranslateX(newPosition);
        }
      } else {
        startTime = currentTime; // Reiniciar el tiempo cuando se reanuda
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimationPaused, isDragging, currentTranslateX, allBrands.length]);
  // Efectos para event listeners globales
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Manejar hover - mantener posición actual
  const handleMouseEnter = () => {
    if (!isDragging) {
      // Capturar posición actual antes de pausar
      if (trackRef.current) {
        const computedStyle = window.getComputedStyle(trackRef.current);
        const matrix = computedStyle.transform;
        if (matrix && matrix !== 'none') {
          const values = matrix.match(/matrix.*\((.+)\)/)?.[1].split(', ');
          if (values && values.length >= 6) {
            setCurrentTranslateX(parseFloat(values[4]));
          }
        }
      }
      setIsAnimationPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsAnimationPaused(false);
    }
  };

  return (
    <div id="marcas" className="w-full py-16 overflow-hidden relative">
      {/* Fondo con degradado sutil de arriba hacia abajo */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(to bottom, #F5F5F5 0%, #e9e7e7 50%, #F5F5F5 100%)'
      }}></div>
      
      {/* Cuadrícula blanca sobre el fondo */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="w-full relative z-10">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ¡Solo las mejores marcas!
          </h2>
        </div>
        
        {/* Cinta única con todas las marcas - Sin Cards */}
        <div className="w-full py-6 relative">
          <div 
            ref={containerRef}
            className={`
              ticker-container overflow-hidden w-full
              ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            `}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ userSelect: 'none' }}
          >
            <div 
              ref={trackRef}
              className="inline-block whitespace-nowrap"
              style={{
                transform: `translateX(${currentTranslateX + dragOffset}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              {tickerBrands.map((brand, index) => (
                <div key={`${brand.name}-${index}`} className="inline-block align-middle mx-8">
                  <div className="transition-transform duration-300 ease-in-out hover:scale-105 p-2 rounded-lg group cursor-pointer">
                    <img 
                      src={brand.logo} 
                      alt={`Logo de ${brand.name}`} 
                      className="h-12 md:h-16 w-auto md:grayscale md:group-hover:grayscale-0 transition-all duration-300 pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;