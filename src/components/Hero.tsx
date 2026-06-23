import { motion } from 'motion/react';
import { IMAGES } from '../constants/images';
import { Calculator, ClipboardCheck, Clock, ShieldCheck, Home, Flame } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-20">
      {/* Background Image with elegant dark-orange tinted overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Hasil Pengerjaan MandorJawa"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.35] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Info */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-orange-400 uppercase tracking-widest"
            >
              <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
              <span>KONTRAKTOR RUMAH RAKYAT TERPERCAYA</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none"
            >
              Jasa Bangun & Renovasi Rumah yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Rapi, Jujur & Terpercaya</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-300 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed"
            >
              Melayani pembangunan rumah baru, renovasi rumah, renovasi ruko, pemasangan keramik, gypsum, pagar, kanopi, dan berbagai pekerjaan konstruksi rumah tinggal skala kecil hingga menengah.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                id="hero-cta-rall"
                onClick={() => onNavigate('calculator')}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 text-base group"
              >
                <Calculator className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Hitung Estimasi RAB</span>
              </button>

              <button
                id="hero-cta-survey"
                onClick={() => onNavigate('survey')}
                className="flex items-center justify-center space-x-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-orange-500/50 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 text-base group"
              >
                <ClipboardCheck className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span>Survey Proyek Gratis</span>
              </button>
            </motion.div>

            {/* Realist benchmarks under CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80"
            >
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500/10 p-1.5 rounded text-orange-400">
                  <Home className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-zinc-400 text-xs block">Spesialis</span>
                  <span className="text-white text-sm font-semibold">Proyek Rumah</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-orange-500/10 p-1.5 rounded text-orange-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-zinc-400 text-xs block">Hasil Pekerjaan</span>
                  <span className="text-white text-sm font-semibold">Sangat Rapi</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-orange-500/10 p-1.5 rounded text-orange-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-zinc-400 text-xs block">Sistem Transparan</span>
                  <span className="text-white text-sm font-semibold">Tepat Waktu</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-orange-500/10 p-1.5 rounded text-orange-400">
                  <Calculator className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-zinc-400 text-xs block">Survey & Estimasi</span>
                  <span className="text-white text-sm font-semibold">100% Gratis</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Quick Stats / Visual Badge Box */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-zinc-950 text-[10px] font-extrabold px-3 py-1 uppercase tracking-wider rounded-bl-xl shadow-sm">
                Proyek Selesai
              </div>

              <h3 className="text-lg font-bold text-white mb-4">
                Dokumentasi Realistis & Nyata
              </h3>
              
              {/* Main thumbnail container */}
              <div className="relative rounded-lg overflow-hidden border border-zinc-800 aspect-video mb-4">
                <img
                  src={IMAGES.hero}
                  alt="Konstruksi MandorJawa Rakyat"
                  className="w-full h-full object-cover filter saturate-[0.85]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-zinc-950/80 backdrop-blur-sm text-[10px] font-mono text-orange-400 px-2 py-1 rounded">
                  Kompleks DKI, Joglo, Kembangan
                </div>
              </div>

              {/* Specs bullet points */}
              <div className="space-y-3.5 text-sm text-zinc-300">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400 font-mono">TIPE PROYEK</span>
                  <span className="text-white font-medium">Rumah Tinggal Rakyat</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400 font-mono">TUKANG</span>
                  <span className="text-white font-medium">Tenaga Jawa Berpengalaman</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400 font-mono font-sans">KONTRAKTOR</span>
                  <span className="text-white font-medium">PT KOKI (MANDORJAWA)</span>
                </div>
              </div>

              {/* Guarantee banner */}
              <div className="mt-5 p-3.5 bg-orange-500/5 rounded-xl border border-orange-500/20 text-xs text-orange-300 flex items-start gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Bebas Biaya Survey!</strong> Tim teknis kami akan datang langsung ke lokasi proyek Anda di wilayah Jakarta Barat & sekitarnya.
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
