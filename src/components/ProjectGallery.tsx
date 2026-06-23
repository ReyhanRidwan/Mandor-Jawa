import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../constants/images';
import { LayoutGrid, Eye, MapPin, Tag } from 'lucide-react';

export default function ProjectGallery() {
  const categories = [
    { value: 'all', label: 'Semua Pekerjaan' },
    { value: 'bangun', label: 'Bangun Baru' },
    { value: 'renovasi', label: 'Renovasi Rumah' },
    { value: 'detil', label: 'Pekerjaan Spesifik' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      id: 'p1',
      title: 'Rumah Tinggal 2 Lantai Sederhana',
      category: 'bangun',
      tag: 'Bangun Baru',
      desc: 'Pembangunan rumah tinggal minimalis modern dari nol, lengkap dengan carport baja ringan.',
      location: 'Joglo, Kembangan',
      image: IMAGES.hero,
      size: '120 m²',
    },
    {
      id: 'p2',
      title: 'Progres Pembangunan Rangka Cor',
      category: 'bangun',
      tag: 'Struktur Beton',
      desc: 'Pengecoran dak lantai 2 serta pemasangan dinding bata merah proyek rumah warga.',
      location: 'Meruya, Jakarta Barat',
      image: IMAGES.pembangunan,
      size: '150 m²',
    },
    {
      id: 'p3',
      title: 'Renovasi Total Fasad & Interior',
      category: 'renovasi',
      tag: 'Renovasi Rumah',
      desc: 'Mengubah rumah lama bergaya tahun 90-an menjadi berpenampilan modern minimalis asri.',
      location: 'Kembangan, Jakbar',
      image: IMAGES.renovasi,
      size: '90 m²',
    },
    {
      id: 'p4',
      title: 'Pemasangan Lantai Homogeneous Tile',
      category: 'detil',
      tag: 'Keramik & Lantai',
      desc: 'Pemasangan ubin granit ukuran 60x60 cm dengan nad sejajar presisi dan rata air.',
      location: 'Joglo, Jakarta Barat',
      image: IMAGES.keramik,
      size: '75 m²',
    },
    {
      id: 'p5',
      title: 'Pemasangan Plafon Drop-Ceiling',
      category: 'detil',
      tag: 'Plat Plafon GRC/Gypsum',
      desc: 'Plafon gypsum tahan retak dengan tataan sekat lampu LED hangat untuk ruang tamu warga.',
      location: 'Kedoya, Jakarta Barat',
      image: IMAGES.gypsum,
      size: '36 m²',
    },
    {
      id: 'p6',
      title: 'Pengecatan Tembok Eksterior & Interior',
      category: 'renovasi',
      tag: 'Cat Rumah',
      desc: 'Finishing cat luar tahan bocor cuaca ekstrem serta cat bagian dalam yang ramah anak.',
      location: 'Joglo, Jakbar',
      image: IMAGES.cat,
      size: '110 m²',
    },
    {
      id: 'p7',
      title: 'Pagar Besi Minimalis Klasik',
      category: 'detil',
      tag: 'Las Pagar Besi',
      desc: 'Pembuatan pagar depan minimalis anti-maling dengan bahan besi hollow cat hitam semi-glaze.',
      location: 'Srengseng, Kembangan',
      image: IMAGES.pagar,
      size: 'Lebar 4.2m',
    },
    {
      id: 'p8',
      title: 'Pemasangan Kanopi Baja Ringan & Alderon',
      category: 'detil',
      tag: 'Kanopi Baja Ringan',
      desc: 'Pemasangan kanopi carport penahan terik cuaca dan tidak berisik ketika hujan turun deras berpola rapi.',
      location: 'Joglo Barat, Jakarta',
      image: IMAGES.kanopi,
      size: '24 m²',
    },
    {
      id: 'p9',
      title: 'Penataan Interior Ruang Keluarga',
      category: 'renovasi',
      tag: 'Interior Sederhana',
      desc: 'Partisi sekat ruangan, pengecatan dinding aksen, penataan sofa sederhana dan pencahayaan yang hangat.',
      location: 'Meruya Selatan, Jakarta',
      image: IMAGES.interior,
      size: '42 m²',
    },
    {
      id: 'p10',
      title: 'Kitchen Set Minimalis Fungsional',
      category: 'renovasi',
      tag: 'Renovasi Dapur',
      desc: 'Pembuatan cor meja kompor dilapisi keramik putih mengkilap dengan lemari gantung kayu lapis sederhana.',
      location: 'Joglo, Kembangan',
      image: IMAGES.dapur,
      size: 'Panjang 3.5m',
    },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-zinc-900 border-b border-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-orange-500 font-mono text-xs font-semibold tracking-widest block uppercase mb-3">
              GALERI PEKERJAAN NYATA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Portofolio Proyek Asli di Lapangan
            </h2>
            <p className="text-zinc-400 mt-3 text-sm font-light">
              Kami tidak menggunakan gambar internet. Seluruh foto di bawah mewakili hasil kerja tim MandorJawa langsung di lokasi warga Jabodetabek dengan kualitas pengerjaan rapi.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'bg-orange-500 text-zinc-950 shadow-md shadow-orange-500/10'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Container */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden group hover:border-orange-500/30 shadow-lg flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900 border-b border-zinc-850">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 saturate-[0.8]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle black overlay on hover showing magnifying scope */}
                  <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-orange-500 text-zinc-950 p-2.5 rounded-full transform scale-90 group-hover:scale-100 transition-transform shadow-md">
                      <Eye className="h-5 w-5 stroke-[2.5]" />
                    </div>
                  </div>
                  
                  {/* Tag overlay */}
                  <span className="absolute bottom-2.5 left-2.5 bg-zinc-950/80 backdrop-blur-sm text-[9px] font-mono font-bold text-orange-400 border border-orange-500/20 rounded px-2 py-0.5 uppercase tracking-widest">
                    {project.tag}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1 text-zinc-500 text-[11px] font-mono">
                      <MapPin className="h-3 w-3 text-orange-500/70" />
                      <span>{project.location}</span>
                    </div>
                    
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>
                  </div>

                  {/* Size info block footer inside card */}
                  <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Tag className="h-2.5 w-2.5 text-zinc-500" />
                      Kapsul Proyek
                    </span>
                    <span className="text-white font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {project.size}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gallery bottom callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-500/5 px-4 py-2.5 rounded-xl border border-orange-500/10">
            <LayoutGrid className="h-4.5 w-4.5 text-orange-500" />
            <span className="text-xs text-zinc-400">
              Butuh melihat hasil detail pengerjaan finishing? <strong className="text-orange-400">Hubungi Mandor melalui survey</strong> untuk menjadwalkan kunjungan proyek aktif.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
