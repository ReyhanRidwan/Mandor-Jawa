import { motion } from 'motion/react';
import { Star, UserCheck, MessageSquareQuote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 't1',
      name: 'Pak Budi Santoso',
      role: 'Pemilik Rumah Tinggal',
      location: 'Komp. DKI, Joglo, Jakarta Barat',
      content: 'Sangat puas dengan tim MandorJawa. Kebetulan saya renovasi peninggian lantai 2. Tukang aslinya rajin, sopan, dan pengerjaan acian dinding sangat rapi halus. Transparan juga tentang pembelian material semen dan besi.',
      rating: 5,
      date: 'April 2026',
    },
    {
      id: 't2',
      name: 'Ibu Linda Wijaya',
      role: 'Ibu Rumah Tangga',
      location: 'Meruya Indah, Jakarta Barat',
      content: 'Pekerjaan pasang homogeneous tile (HT) ruang tamu dikerjakan presisi sekali. Nad sejajar lurus tanpa bergelombang. Komunikasi mandor via WhatsApp grup sangat lancar dengan laporan progres foto lapangan setiap sore.',
      rating: 5,
      date: 'Februari 2026',
    },
    {
      id: 't3',
      name: 'Pak Rudy Hermawan',
      role: 'Wiraswasta',
      location: 'Kedoya Garden, Jakarta Barat',
      content: 'Kalkulator RAB di website sangat membantu buat gambaran dana awal. Pas dipanggil buat tim survey gratis, ternyata pergeseran rinciannya ga jauh beda. Atap baja ringan alderon & plafon gypsum rapi dipasang.',
      rating: 5,
      date: 'Mei 2026',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-zinc-950 border-t border-b border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-500 font-mono text-xs font-semibold tracking-widest block uppercase mb-3">
            ULASAN KLIEN KAMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ulasan Jujur Pemilik Rumah Tinggal
          </h2>
          <p className="text-zinc-400 mt-4 text-sm font-light">
            Dengarkan tanggapan nyata dari para warga kompleks di area Joglo, Kembangan, dan wilayah Jakarta Barat sekitarnya yang telah mempercayakan pengerjaan huniannya kepada PT KOKI (MANDORJAWA).
          </p>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between hover:border-orange-500/20 transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-zinc-800 group-hover:text-orange-500/10 transition-colors pointer-events-none">
                <MessageSquareQuote className="h-10 w-10 stroke-[1.5]" />
              </div>

              <div className="space-y-4">
                {/* Score Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <p className="text-zinc-300 text-sm italic font-light leading-relaxed">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-850 flex items-center space-x-3.5">
                <div className="bg-orange-500/10 text-orange-400 p-2 rounded-xl border border-orange-500/20">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{rev.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-mono block">
                    {rev.location} ({rev.date})
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
