'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Menu, 
  X 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const heroBtnRef = useRef<HTMLAnchorElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. HERO SECTION STOREFRONT REVEAL
    const heroImg = document.querySelector('.hero-store-img');
    if (heroImg) {
      gsap.fromTo(
        heroImg,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scale: 1.15,
          opacity: 0.6,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1.0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    }

    // 2. HERO BUTTON: Magnetic Mouse Effect (Desktop only)
    const heroBtn = heroBtnRef.current;
    const heroArea = heroContainerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroBtn || window.innerWidth < 768) return;
      const rect = heroBtn.getBoundingClientRect();
      const btnCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const dx = e.clientX - btnCenter.x;
      const dy = e.clientY - btnCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        const pull = (120 - dist) / 120;
        gsap.to(heroBtn, {
          x: dx * pull * 0.4,
          y: dy * pull * 0.4,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(heroBtn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (heroBtn) {
        gsap.to(heroBtn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    if (heroArea) {
      heroArea.addEventListener('mousemove', handleMouseMove);
      heroArea.addEventListener('mouseleave', handleMouseLeave);
    }

    // 3. SHOP BY COLLECTION ANIMATIONS
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach((card, index) => {
      const initialClip = index % 2 === 0
        ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';

      const img = card.querySelector('.collection-img');
      if (img) {
        gsap.fromTo(
          img,
          {
            clipPath: initialClip,
            scale: 1.15,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1.0,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          }
        );
      }
    });

    // 4. A LITTLE MORE RADIANCE SPOTLIGHT ANIMATION
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
      const img = card.querySelector('.product-img');
      if (img) {
        gsap.fromTo(
          img,
          {
            clipPath: 'circle(0% at 50% 50%)',
            scale: 0.85,
            filter: 'brightness(1.3) blur(4px)',
          },
          {
            clipPath: 'circle(100% at 50% 50%)',
            scale: 1,
            filter: 'brightness(1) blur(0px)',
            duration: 1.0,
            ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.08,
          }
        );
      }
    });

    // 5. WHERE TRADITION MEETS TRUST ANIMATION
    const heritageImg = document.querySelector('.heritage-box-img');
    if (heritageImg) {
      gsap.fromTo(
        heritageImg,
        {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          scale: 1.1,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1.0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heritageImg,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // LOTUS MOTIF FLOATING ROTATION
    const lotusMotif = document.querySelector('.lotus-motif');
    if (lotusMotif) {
      gsap.to(lotusMotif, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }

    return () => {
      if (heroArea) {
        heroArea.removeEventListener('mousemove', handleMouseMove);
        heroArea.removeEventListener('mouseleave', handleMouseLeave);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const collections = [
    {
      title: "Gold Jewellery",
      image: "/collections/gold/gold-collection.png",
      href: "#collections",
      subtitle: "22K Traditional Craft"
    },
    {
      title: "Diamond Jewellery",
      image: "/collections/diamond/diamond-collection.png",
      href: "#collections",
      subtitle: "Solitaire Brilliance"
    },
    {
      title: "Bridal Collection",
      image: "/collections/bridal/bridal-collection.png",
      href: "#collections",
      subtitle: "Heritage Wedding Sets"
    },
    {
      title: "Everyday Elegance",
      image: "/collections/gold/everyday-collection.png",
      href: "#collections",
      subtitle: "Minimal Contemporary"
    }
  ];

  const radianceProducts = [
    {
      id: 1,
      price: "₹52,000",
      image: "/products/necklaces/necklace-featured.png",
      name: "Handcrafted Heritage Choker"
    },
    {
      id: 2,
      price: "₹73,000",
      image: "/products/bangles/bangle-featured.png",
      name: "Traditional Embossed Gold Kada"
    },
    {
      id: 3,
      price: "₹38,000",
      image: "/products/earrings/earring-featured.png",
      name: "Royal Filigree Temple Jhumkas"
    },
    {
      id: 4,
      price: "₹47,000",
      image: "/products/rings/ring-featured.png",
      name: "Solitaire Crown Gold Ring"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#3D1418] selection:bg-[#461115] selection:text-[#F3DFB0] overflow-x-hidden">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <header className="bg-[#461115] text-[#D8B467] text-[10px] sm:text-[11px] md:text-[12.5px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium py-2 px-3 text-center border-b border-[#5a1b21] shadow-sm">
        Crafted with Trust &bull; Celebrating Every Occasion
      </header>

      {/* 2. MAIN NAVIGATION */}
      <nav className="bg-[#FDFBF7]/95 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 lg:px-14 py-2.5 sm:py-3 flex items-center justify-between border-b border-[#EEDFCA]/60 shadow-sm">
        {/* LOGO */}
        <div className="flex items-center cursor-pointer group">
          <img
            src="/logo.png"
            alt="Rishav Jewellers"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </div>

        {/* DESKTOP NAV LINKS WITH HEARTBEAT EFFECT */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#461115]">
          <a href="#" className="nav-link text-[#461115]">Home</a>
          <a href="#collections" className="nav-link hover:text-[#A37B3D] transition-colors">Collections</a>
          <a href="#collections" className="nav-link hover:text-[#A37B3D] transition-colors">Gold</a>
          <a href="#collections" className="nav-link hover:text-[#A37B3D] transition-colors">Diamond</a>
          <a href="#collections" className="nav-link hover:text-[#A37B3D] transition-colors">Bridal</a>
          <a href="#about" className="nav-link hover:text-[#A37B3D] transition-colors">About Us</a>
        </div>

        {/* ICONS & ACTIONS */}
        <div className="flex items-center gap-3 sm:gap-5 text-[#461115]">
          <button aria-label="Search" className="hover:opacity-75 transition-transform hover:scale-110 p-1">
            <img src="/icons/search.svg" alt="Search" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button aria-label="Account" className="hover:opacity-75 transition-transform hover:scale-110 p-1 hidden xs:block">
            <img src="/icons/user.svg" alt="User" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button aria-label="Wishlist" className="hover:opacity-75 transition-transform hover:scale-110 relative p-1">
            <img src="/icons/heart.svg" alt="Wishlist" className="w-4 h-4 sm:w-5 sm:h-5" />
            {likedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#461115] text-[#F3DFB0] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {likedItems.length}
              </span>
            )}
          </button>
          <button aria-label="Cart" className="hover:opacity-75 transition-transform hover:scale-110 p-1">
            <img src="/icons/bag.svg" alt="Cart" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden ml-1 p-1 text-[#461115] hover:text-[#A37B3D]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#EADAC5] px-6 py-5 flex flex-col gap-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#461115] shadow-lg animate-fadeIn">
          <a href="#" className="py-1 border-b border-[#E8D8C3]/50" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#collections" className="py-1 border-b border-[#E8D8C3]/50" onClick={() => setMobileMenuOpen(false)}>Collections</a>
          <a href="#collections" className="py-1 border-b border-[#E8D8C3]/50" onClick={() => setMobileMenuOpen(false)}>Gold Jewellery</a>
          <a href="#collections" className="py-1 border-b border-[#E8D8C3]/50" onClick={() => setMobileMenuOpen(false)}>Diamond Jewellery</a>
          <a href="#collections" className="py-1 border-b border-[#E8D8C3]/50" onClick={() => setMobileMenuOpen(false)}>Bridal Collection</a>
          <a href="#about" className="py-1" onClick={() => setMobileMenuOpen(false)}>About Us</a>
        </div>
      )}

      {/* 3. HERO SECTION */}
      <section ref={heroContainerRef} className="relative overflow-hidden bg-gradient-to-r from-[#F7F0E5] via-[#FCF8F2] to-[#F5ECE0] border-b border-[#E8D8C3]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center min-h-[500px] lg:min-h-[560px]">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-6 px-6 sm:px-10 lg:px-16 pt-10 pb-8 sm:py-14 flex flex-col justify-center relative z-10 text-center lg:text-left items-center lg:items-start">
            <div className="space-y-4 sm:space-y-6 max-w-xl">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#481418] leading-[1.18] tracking-tight">
                Timeless Elegance,<br />
                <span className="italic font-normal">Made to Treasure</span>
              </h2>

              {/* LUXURY GOLD DIAMOND DIVIDER EMBLEM */}
              <div className="pt-0.5 pb-0.5 max-w-[220px] sm:max-w-[270px] mx-auto lg:mx-0">
                <img
                  src="/gold-divider.png"
                  alt="Gold Diamond Divider"
                  className="w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(184,137,52,0.2)]"
                />
              </div>

              <p className="text-base sm:text-lg md:text-xl text-[#6D4A3D] font-serif italic tracking-wide">
                Discover jewellery that celebrates every moment.
              </p>

              <div className="pt-1 sm:pt-2">
                <a 
                  ref={heroBtnRef}
                  href="#collections"
                  className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#461115] hover:bg-[#5C161D] text-[#EFE4D2] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] font-semibold transition-shadow shadow-md hover:shadow-xl cursor-pointer select-none"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DDB574]" />
                </a>
              </div>

              {/* CRAFTSMANSHIP BADGE TRANSPARENT PNG */}
              <div className="pt-2 sm:pt-3 max-w-[300px] sm:max-w-[370px] mx-auto lg:mx-0 lg:-ml-2 origin-center lg:origin-left">
                <img
                  src="/legacy-badge-transparent.png"
                  alt="A legacy of craftsmanship"
                  className="w-full h-auto object-contain scale-x-105 sm:scale-x-110 filter drop-shadow-[0_2px_4px_rgba(184,137,52,0.15)]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: SHOWROOM STOREFRONT */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-4 sm:p-6 lg:p-8 pb-10 lg:pb-8">
            <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[620px] rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-[#DFC59E] bg-[#3B1216] group">
              <div className="relative w-full overflow-hidden">
                <img
                  src="/banners/hero-store.png"
                  alt="Rishav Jewellers Showroom Storefront"
                  className="hero-store-img w-full h-auto object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SHOP BY COLLECTION */}
      <section id="collections" className="py-14 sm:py-20 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto w-full">
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center justify-center mb-10 sm:mb-14 text-center">
          <div className="w-full max-w-[200px] sm:max-w-xs md:max-w-md mb-2">
            <img
              src="/gold-divider.png"
              alt="Decorative Divider"
              className="w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(184,137,52,0.25)]"
            />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#461115]">
            Shop by Collection
          </h3>
          <p className="text-xs sm:text-sm font-serif italic text-[#7D5A47] mt-1">Curated masterpieces for every grand celebration</p>
        </div>

        {/* 4 TILES GRID: 2x2 ON MOBILE, 4 ON DESKTOP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {collections.map((item, idx) => (
            <div
              key={idx}
              className="collection-card group relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#DFC59E] sm:border-2 bg-[#2E0B0F]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="collection-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>

              {/* CARD BOTTOM OVERLAY */}
              <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-4 text-center flex flex-col items-center justify-center">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-[#E5C78D] opacity-75 mb-0.5 hidden xs:block">
                  {item.subtitle}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 text-white group-hover:text-[#F3DFB0] transition-colors">
                  <h4 className="font-serif text-xs sm:text-base lg:text-lg font-medium tracking-wide">
                    {item.title}
                  </h4>
                  <span className="text-xs sm:text-sm group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. A LITTLE MORE RADIANCE (PRODUCT SHOWCASE) */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-14 bg-gradient-to-b from-[#FAF4EC] to-[#F6EEE0] border-y border-[#E9DAC8]">
        <div className="max-w-7xl mx-auto w-full">
          {/* SECTION TITLE */}
          <div className="flex flex-col items-center justify-center mb-10 sm:mb-14 text-center">
            <div className="w-full max-w-[180px] sm:max-w-xs md:max-w-sm mb-2">
              <img
                src="/gold-divider.png"
                alt="Decorative Divider"
                className="w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(184,137,52,0.25)]"
              />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#461115] font-semibold tracking-wide">
              A Little More Radiance
            </h3>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#936C38] mt-1 font-semibold">
              Signature Handpicked Treasures
            </span>
          </div>

          {/* 4 PRODUCT CARDS: 2x2 ON MOBILE, 4 ON DESKTOP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {radianceProducts.map((prod) => (
              <div
                key={prod.id}
                className="product-card bg-[#FCFAF6] rounded-lg sm:rounded-xl overflow-hidden border border-[#E6D5C0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* IMAGE BOX */}
                <div className="relative aspect-square w-full bg-[#F3EFE9] p-2 sm:p-3 flex items-center justify-center overflow-hidden">
                  <button
                    onClick={() => toggleLike(prod.id)}
                    aria-label="Save to Wishlist"
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-sm flex items-center justify-center text-[#461115] shadow transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        likedItems.includes(prod.id)
                          ? 'fill-[#461115] text-[#461115]'
                          : 'text-[#461115]'
                      }`}
                    />
                  </button>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="product-img w-full h-full object-cover rounded-md sm:rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* DETAILS & PRICE */}
                <div className="p-2.5 sm:p-4 flex flex-col items-center justify-center text-center bg-[#FAF6F0] border-t border-[#EFE5D7]">
                  <p className="text-[10px] sm:text-xs text-[#7A5B47] font-serif mb-0.5 sm:mb-1 line-clamp-1">
                    {prod.name}
                  </p>
                  <span className="font-serif text-sm sm:text-lg md:text-xl font-bold text-[#461115] tracking-wider">
                    {prod.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHERE TRADITION MEETS TRUST */}
      <section id="about" className="py-14 sm:py-20 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ANTIQUE JEWELLERY CHEST */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[340px] sm:max-w-md aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DFC59E]">
              <img
                src="/decorative/heritage-jewellery-box.png"
                alt="Heritage Antique Jewellery Box"
                className="heritage-box-img w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#461115]/30 to-transparent" />
            </div>
          </div>

          {/* BRAND STORY CONTENT */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 relative text-center lg:text-left items-center lg:items-start flex flex-col order-1 lg:order-2">
            {/* LOTUS FLORAL MOTIF CONTINUOUS ROTATION */}
            <div className="absolute right-0 top-0 opacity-15 pointer-events-none hidden sm:block max-w-[140px]">
              <img
                src="/decorative/lotus-floral-motif.png"
                alt="Lotus Motif"
                className="lotus-motif w-full h-auto object-contain"
              />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#461115] leading-tight">
              Where Tradition Meets Trust
            </h3>

            <p className="font-serif text-sm sm:text-base lg:text-lg text-[#614539] leading-relaxed max-w-xl">
              At Rishav Jewellers, we believe jewellery is more than an ornament — 
              it&apos;s a symbol of love, tradition and timeless beauty. With a legacy of 
              craftsmanship and a promise of purity, we bring you the finest designs 
              for every special moment.
            </p>

            <div className="pt-1 sm:pt-2">
              <a 
                href="#contact"
                className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#461115] hover:bg-[#5C161D] text-[#EFE4D2] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] font-semibold transition-all shadow-md hover:shadow-xl hover:translate-x-1"
              >
                Know More
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DDB574]" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 7. LUXURY FOOTER */}
      <footer id="contact" className="bg-[#461115] text-[#F0E6D6] pt-12 sm:pt-16 border-t border-[#601A20]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-14 pb-10 sm:pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* BRAND COLUMN */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3 sm:space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
            <div className="flex items-center">
              <div className="bg-[#FAF6F0] p-1.5 sm:p-2 rounded-lg inline-block border border-[#D5B273]/40 shadow-inner">
                <img
                  src="/logo.png"
                  alt="Rishav Jewellers"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2.5 text-base sm:text-lg font-serif tracking-widest text-[#F5E5C9]">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#D8B467]" />
              <a href="tel:9304220642" className="hover:text-[#D8B467] transition-colors font-medium">
                9304220642
              </a>
            </div>
            <p className="text-xs text-[#D1B8A5] font-serif italic max-w-xs leading-relaxed">
              Hallmarked pure gold, certified natural diamonds, and heritage bridal suites crafted for life&apos;s most cherished milestones.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
            <h5 className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#E5C78D] border-b border-[#692128] pb-1 inline-block">
              Quick Links
            </h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs font-serif flex flex-col">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#collections" className="footer-link">Collections</a></li>
              <li><a href="#about" className="footer-link">About Us</a></li>
              <li><a href="#contact" className="footer-link">Contact Us</a></li>
            </ul>
          </div>

          {/* OUR COLLECTIONS */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h5 className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#E5C78D] border-b border-[#692128] pb-1 inline-block">
              Our Collections
            </h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs font-serif flex flex-col">
              <li><a href="#collections" className="footer-link">Gold Jewellery</a></li>
              <li><a href="#collections" className="footer-link">Diamond Jewellery</a></li>
              <li><a href="#collections" className="footer-link">Bridal Collection</a></li>
              <li><a href="#collections" className="footer-link">Everyday Elegance</a></li>
            </ul>
          </div>

          {/* VISIT OUR STORE */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h5 className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#E5C78D] border-b border-[#692128] pb-1 inline-block">
              Visit Our Store
            </h5>
            <div className="flex items-start gap-2 text-xs text-[#E1D1BF] font-serif leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D8B467] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#F3DFB0]">Rishav Jewellers</p>
                <p className="text-[#CBB59E] italic mt-0.5">(Shop Address Here)</p>
                <p className="text-[11px] text-[#A68875] mt-1">Mon - Sun: 10:30 AM - 08:30 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="border-t border-[#54171D] py-4 px-6 text-center flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#D8BA9F] max-w-7xl mx-auto tracking-widest uppercase gap-3">
          <div className="flex items-center gap-2">
            <span>RISHAV JEWELLERS</span>
            <span>&bull;</span>
            <span className="text-[#D8B467]">SHINE FOREVER</span>
          </div>

          <div className="flex items-center gap-4 text-[#E5C78D]">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
