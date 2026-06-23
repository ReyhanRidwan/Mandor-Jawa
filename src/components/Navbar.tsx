import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Construction } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Tentang Kami', id: 'about' },
    { label: 'Layanan', id: 'services' },
    { label: 'Proyek', id: 'projects' },
    { label: 'Kalkulator RAB', id: 'calculator' },
    { label: 'Survey Proyek', id: 'survey' },
    { label: 'FAQ', id: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg border-b border-zinc-800 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="navbar-logo"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleClick('home')}
          >
            <div className="bg-orange-500 text-zinc-950 p-2 rounded-lg flex items-center justify-center">
              <Construction className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5 leading-none">
                MANDOR<span className="text-orange-500">JAWA</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-widest block uppercase">
                PT Koki Kontraktor
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-menu" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-orange-500 hover:bg-zinc-800/40 rounded-lg transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <button
              id="cta-konsultasi-navbar"
              onClick={() => handleClick('survey')}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
            >
              <Phone className="h-4 w-4 fill-zinc-950" />
              <span>Konsultasi Gratis</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-zinc-950 border-b border-zinc-800"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="block w-full text-left px-4 py-2.5 text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-2 border-t border-zinc-800 px-4">
                <button
                  id="mobile-cta-konsultasi"
                  onClick={() => handleClick('survey')}
                  className="w-full flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-3 rounded-lg shadow-lg"
                >
                  <Phone className="h-4 w-4 fill-zinc-950" />
                  <span>Konsultasi Gratis</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
