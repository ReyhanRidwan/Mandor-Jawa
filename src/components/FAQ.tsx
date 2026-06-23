import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const faqItems = [
    {
      id: 'f1',
      question: 'Berapa rata-rata biaya bangun rumah per meter persegi?',
      answer: 'Biaya bangun baru bervariasi bergantung pada spesifikasi bahan baku. Kelas Standar berkisar Rp 3,5 Juta - Rp 4,2 Juta/m², kelas Menengah (rekomendasi material rapi tahan bocor) sekitar Rp 4,3 Juta - Rp 4,9 Juta/m², dan kelas Premium di atas Rp 5,4 Juta/m². Anggaran resmi didiskusikan secara bertahap pasca survey visual lapangan.',
    },
    {
      id: 'f2',
      question: 'Apakah MandorJawa bersedia melayani renovasi sebagian rumah?',
      answer: 'Sangat bisa! Bisnis kami berfokus pada kesejahteraan warga sehingga kami tidak membatasi kuota minimum. Kami dengan senang hati melayani perbaikan sebagian seperti renovasi kamar mandi, pembuatan kolam dapur beton, pengecatan dinding luar, pemasangan keramik teras, canopy baja ringan, hingga instalasi pintu pagar halaman.',
    },
    {
      id: 'f3',
      question: 'Apakah wilayah operasional MandorJawa mencakup seluruh Jabodetabek?',
      answer: 'Ya, kami melayani daerah Jakarta, Bogor, Depok, Tangerang, dan Bekasi (Jabodetabek). Basecamp dan workshop fisik tim tukang batu/las kami berlokasi strategis di Joglo, Kembangan, Jakarta Barat, sehingga kami sangat responsif khususnya untuk area Jakarta Barat dan sekitarnya.',
    },
    {
      id: 'f4',
      question: 'Bagaimana sistem survey gratis dari tim PT KOKI?',
      answer: 'Sistemnya sangat sederhana. Anda mengisi Survey Proyek di website ini, lalu klik Kirim ke WhatsApp. Tim Mandor kami akan membalas pesan Anda untuk mencocokkan tanggal & waktu survey lokasi. Mandor kami datang, mengukur bidang tanah fisik, berkonsultasi mengenai struktur, lalu mengalkulasi RAB asli. Semua layanan awal ini gratis 100%.',
    },
    {
      id: 'f5',
      question: 'Apakah bisa membantu mendisposisikan gambar arsitektur / desain rumah?',
      answer: 'Bisa sekali! Kami menyediakan jasa konsultasi gambar kerja denah, tata posisi sirkulasi cahaya/udara tropis, hingga draft visual sederhana. Ini membantu tukang di bawah Mandor bekerja searah amanah, fungsional, dan ramah kantong anggaran warga.',
    },
  ];

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-900 border-b border-zinc-950 relative">
      <div className="absolute bottom-12 right-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 font-mono text-xs font-semibold tracking-widest block uppercase mb-3">
            TANYA JAWAB (FAQ)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-md"
              >
                <button
                  id={`faq-toggle-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-white hover:text-orange-400 hover:bg-zinc-900/35 transition-all outline-none"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className="h-5.5 w-5.5 text-orange-500 shrink-0" />
                    <span className="text-base sm:text-lg">{item.question}</span>
                  </div>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-zinc-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-zinc-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 border-t border-zinc-900 text-zinc-400 text-sm leading-relaxed font-light bg-zinc-950">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
