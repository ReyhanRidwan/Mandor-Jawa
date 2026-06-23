import { motion } from 'motion/react';
import { MapPin, Phone, Instagram, Construction, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const seoKeywords = [
    'kontraktor rumah jakarta',
    'jasa renovasi rumah jakarta',
    'tukang bangunan jakarta',
    'kontraktor rumah jakarta barat',
    'jasa bangun rumah jakarta',
    'renovasi rumah jakarta barat',
  ];

  return (
    <footer id="footer" className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 font-light">
      
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-2.5">
              <div className="bg-orange-500 text-zinc-950 p-2 rounded-lg flex items-center justify-center">
                <Construction className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-sans font-black text-xl tracking-wider text-white">
                  MANDOR<span className="text-orange-500 font-extrabold font-sans">JAWA</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest block uppercase">
                  PT KOKI (KONTRAKTOR)
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              "Bangun dan Renovasi Rumah dengan Pengerjaan Rapi dan Terpercaya"
            </p>
            
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm font-sans">
              MANDORJAWA melayani pembangunan baru, renovasi total, penambahan lantai, pembuatan pagar/kanopi, serta penataan interior fungsional untuk hunian tapak di area Jakarta Barat & sekitarnya.
            </p>

            {/* Verification marker */}
            <div className="flex items-center space-x-2 text-xs text-orange-400/80 bg-orange-500/5 px-3 py-1.5 rounded-lg border border-orange-500/10 inline-flex">
              <ShieldCheck className="h-4 w-4 text-orange-500" />
              <span>Kontraktor Berizin & Terdaftar Resmi PT KOKI</span>
            </div>
          </div>

          {/* Column 2: Fast Navigation links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Navigasi Cepat
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Halaman Utama', id: 'home' },
                { label: 'Tentang MandorJawa', id: 'about' },
                { label: 'Katalog Layanan', id: 'services' },
                { label: 'Galeri & Portofolio', id: 'projects' },
                { label: 'Kalkulator RAB Mandiri', id: 'calculator' },
                { label: 'Survey Kualifikasi Proyek', id: 'survey' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-orange-400 transition-colors text-zinc-400 hover:underline text-left block py-0.5"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details & Office */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Kantor & Kontak Lapangan
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-zinc-400 leading-relaxed text-xs">
                  <strong>Basecamp Fisik:</strong><br />
                  39, Komp. DKI Blk. DD No.39,
                  RT.6/RW.4, Joglo, Kec. Kembangan,
                  Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11640
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <a
                  href="https://wa.me/628118220123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>0811-822-0123 (Staf Konsultasi)</span>
                  <ExternalLink className="h-3 w-3 text-zinc-500" />
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-orange-500 shrink-0" />
                <a
                  href="https://www.instagram.com/mandorjawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>@mandorjawa (Dokumentasi Lapangan)</span>
                  <ExternalLink className="h-3 w-3 text-zinc-500" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Footer: Area Layanan SEO Tags */}
      <div className="border-t border-zinc-900 bg-zinc-950/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-xs text-zinc-500 uppercase font-mono tracking-wider font-semibold">
              Kategori Terkait & Target Wilayah:
            </span>
            <div className="flex flex-wrap gap-2">
              {seoKeywords.map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-900 hover:bg-zinc-850 text-zinc-500 hover:text-zinc-300 text-[10px] sm:text-xs px-3 py-1 rounded-md border border-zinc-850/80 uppercase font-mono tracking-normal cursor-default transition-colors"
                >
                  #{tag.replace(/\s+/g, '-')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Credit bar */}
      <div className="border-t border-zinc-900 bg-zinc-950 py-6 text-xs text-zinc-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} PT KOKI - MANDORJAWA. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex space-x-4">
            <span className="hover:text-zinc-400 cursor-help">Syarat & Ketentuan Kelayakan Survey</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-help">Dasar Regulasi Konstruksi Jakarta</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
