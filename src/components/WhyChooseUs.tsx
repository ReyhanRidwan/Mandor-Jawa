import { motion } from 'motion/react';
import { Search, Flame, Receipt, MessageSquare, Users2, Timer } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Search,
      title: 'Survey Gratis',
      desc: 'Kami datang ke lokasi proyek Anda tanpa biaya sepeser pun. Dilengkapi pengukuran akurat dan konsultasi langsung mengenai struktur konstruksi.',
    },
    {
      icon: Flame,
      title: 'Pengerjaan Rapi',
      desc: 'Standar kerapian tinggi dengan tukang kawakan asal Jawa. Sambungan keramik, acian dinding, dan struktur plafon dikerjakan dengan sangat presisi.',
    },
    {
      icon: Receipt,
      title: 'Harga Transparan',
      desc: 'Semua harga terperinci dalam RAB. Tidak ada biaya siluman, pembelian material fiktif, atau manipulasi jam kerja tukang di lapangan.',
    },
    {
      icon: MessageSquare,
      title: 'Komunikasi Mudah',
      desc: 'Anda mendapatkan laporan progres berkala melalui grup WhatsApp. Konsultasi mengenai opsi arsitektural didiskusikan secara kekeluargaan.',
    },
    {
      icon: Users2,
      title: 'Tenaga Berpengalaman',
      desc: 'Didukung oleh tim "Mandor Jawa" asli yang paham seluk beluk konstruksi rumah di iklim tropis, memastikan ketahanan optimal bangunan Anda.',
    },
    {
      icon: Timer,
      title: 'Tepat Waktu',
      desc: 'Skedul pengerjaan terencana. Kami berkomitmen menyelesaikan bangunan sesuai tenggat waktu disepakati tanpa mengurangi kualitas struktur.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Decorative Construction lines pattern in background limits */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-orange-500 font-mono text-xs font-semibold tracking-widest block uppercase mb-3"
          >
            MENGAPA MEMILIH MANDORJAWA
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Komitmen Kami Menghadirkan Pekerjaan Konstruksi Berkualitas Tanpa Ribet
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, idx) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-zinc-950/80 border border-zinc-800 hover:border-orange-500/30 p-6 rounded-2xl shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="bg-zinc-900 text-orange-500 p-3.5 rounded-xl inline-flex items-center justify-center border border-zinc-800 shadow-inner mb-5 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-zinc-950 transition-all duration-300">
                    <IconComponent className="h-6 w-6 stroke-[2]" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {point.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    {point.desc}
                  </p>
                </div>
                
                {/* Visual construction marker */}
                <div className="h-0.5 bg-orange-500/20 w-0 group-hover:w-full transition-all duration-300 mt-6" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
