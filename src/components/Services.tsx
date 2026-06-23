import { motion } from 'motion/react';
import { IMAGES } from '../constants/images';
import { ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const coreServices = [
    {
      title: 'Bangun Rumah Baru',
      desc: 'Melayani pembangunan rumah tinggal 1 hingga 2 lantai dari awal (pondasi) hingga finishing serah terima kunci. Terencana & transparan.',
      image: IMAGES.pembangunan,
      tag: 'Paling Populer',
      surveyValue: 'Bangun Rumah',
    },
    {
      title: 'Renovasi Rumah',
      desc: 'Perbaikan total atau parsial, peninggian lantai, bongkar pasang sekat, hingga renovasi fasad agar lebih modern dan asri.',
      image: IMAGES.renovasi,
      tag: 'Rekomendasi',
      surveyValue: 'Renovasi Rumah',
    },
    {
      title: 'Renovasi Dapur & Kamar Mandi',
      desc: 'Pembuatan kitchen set minimalis, meja beton cor dapur, instalasi sink, shower, kloset, serta perapihan keramik dinding basah.',
      image: IMAGES.dapur,
      tag: 'Fungsional',
      surveyValue: 'Interior',
    },
    {
      title: 'Pemasangan Keramik & Granit',
      desc: 'Pemasangan lantai keramik, homogeneous tile (HT), atau granit besar dengan presisi tinggi, nad rapi, kokoh, dan tidak melenting.',
      image: IMAGES.keramik,
      tag: 'Spesialis',
      surveyValue: 'Lainnya',
    },
    {
      title: 'Pemasangan Plafon & Gypsum',
      desc: 'Rangka hollow galvalum kokoh dengan penutup gypsum, PVC, atau GRC. Desain flat maupun drop ceiling artistik modern.',
      image: IMAGES.gypsum,
      tag: 'Rapi',
      surveyValue: 'Lainnya',
    },
    {
      title: 'Pengecatan Rumah tinggal',
      desc: 'Pengecatan eksterior tahan cuaca (weathershield) dan interior halus dengan perataan plamir prima, bebas noda bocor.',
      image: IMAGES.cat,
      tag: 'Ekonomis',
      surveyValue: 'Lainnya',
    },
    {
      title: 'Pembuatan Kanopi Baja Ringan',
      desc: 'Pemasangan kanopi carport rangka baja ringan atau besi hollow dengan atap Polycarbonate, Alderon, spandek pasir, dll.',
      image: IMAGES.kanopi,
      tag: 'Best Seller',
      surveyValue: 'Kanopi',
    },
    {
      title: 'Pembuatan Pagar Minimalis',
      desc: 'Pagar besi minimalis, pintu geser wrought iron modern, ram baja welded mesh tangguh, tahan karat, tahan benturan keras.',
      image: IMAGES.pagar,
      tag: 'Keamanan',
      surveyValue: 'Pagar',
    },
    {
      title: 'Desain Rumah & Interior Sederhana',
      desc: 'Pembuatan gambar kerja (DED), denah tata letak ruang fungsional, visualisasi sederhana agar tukang bekerja searah amanah.',
      image: IMAGES.interior,
      tag: 'Eksklusif',
      surveyValue: 'Interior',
    },
  ];

  const additionalServices = [
    'Renovasi Ruko',
    'Penambahan Ruangan',
    'Perbaikan Atap & Genteng Bocor',
    'Pekerjaan Plafon Rumah',
    'Instalasi Listrik & Titik Lampu Baru',
    'Instalasi Air Bersih & Pembuangan Kotor',
    'Konsultasi Pembangunan Rumah Sederhana',
    'Peninggian Lantai Anti Banjir',
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950 border-t border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-500 font-mono text-xs font-semibold tracking-widest block uppercase mb-3">
            LAYANAN UTAMA KAMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Melayani Segala Bentuk Konstruksi Rumah Tinggal Anda
          </h2>
          <p className="text-zinc-400 mt-4 text-sm font-light">
            Mulai dari urusan perbaikan atap bocor berskala kecil hingga pembangunan rumah tinggal baru 2 lantai dari tanah kosong. Dipandu oleh Mandor berpengalaman secara transparan.
          </p>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/40 shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 saturate-[0.85]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                
                {/* Badge Tag */}
                <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-sm text-orange-400 border border-orange-500/20 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded">
                  {service.tag}
                </span>

                <div className="absolute bottom-3 right-3 bg-orange-500 text-zinc-950 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-850">
                  <button
                    onClick={() => onSelectService(service.surveyValue)}
                    className="w-full text-center text-xs font-semibold text-zinc-300 hover:text-white group-hover:text-orange-500 py-2.5 bg-zinc-950 group-hover:bg-orange-500/10 border border-zinc-800 group-hover:border-orange-500/30 rounded-lg tracking-wider transition-all duration-300"
                  >
                    Minta Penawaran Layanan
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Specialties Ribbon */}
        <div className="mt-20 p-8 bg-zinc-900 rounded-3xl border border-zinc-800 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center space-x-1.5 bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase font-semibold">
                <Zap className="h-3 w-3" />
                <span>SPESIALISASI TAMBAHAN</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Serta Pengerjaan Konstruksi Detail Lainnya
              </h3>
              <p className="text-zinc-400 text-sm font-light">
                Rumah bocor di musim hujan? Ingin menambah ruangan di halaman belakang atau butuh instalasi listrik ruko baru Anda? Tim kami siap melayani pesanan spesifik.
              </p>
            </div>

            <div className="lg:col-span-1 border-r border-zinc-800 h-full hidden lg:block" />

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {additionalServices.map((serviceName) => (
                <div key={serviceName} className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                  <span className="text-zinc-300 text-sm hover:text-white transition-colors">
                    {serviceName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
