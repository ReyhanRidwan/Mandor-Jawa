import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, AlertCircle, ArrowRight, ClipboardCheck, Info } from 'lucide-react';
import { RABInput, RABResult } from '../types';

interface RABCalculatorProps {
  onContinueToSurvey: (data: { projectType: string; area: string }) => void;
}

export default function RABCalculator({ onContinueToSurvey }: RABCalculatorProps) {
  // Calculator Inputs
  const [projectType, setProjectType] = useState<'bangun_baru' | 'renovasi'>('bangun_baru');
  const [buildingArea, setBuildingArea] = useState<number>(70);
  const [floorsCount, setFloorsCount] = useState<number>(1);
  const [materialQuality, setMaterialQuality] = useState<'standar' | 'menengah' | 'premium'>('menengah');

  const [results, setResults] = useState<RABResult | null>(null);

  // Calculate RAB whenever inputs change
  useEffect(() => {
    // Define rates per square meters (IDR)
    let rateMin = 0;
    let rateMax = 0;

    if (projectType === 'bangun_baru') {
      if (materialQuality === 'standar') {
        rateMin = 3400000;
        rateMax = 3900000;
      } else if (materialQuality === 'menengah') {
        rateMin = 4300000;
        rateMax = 4900000;
      } else {
        rateMin = 5400000;
        rateMax = 6500000;
      }
    } else {
      // Renovasi
      if (materialQuality === 'standar') {
        rateMin = 1500000;
        rateMax = 2000000;
      } else if (materialQuality === 'menengah') {
        rateMin = 2200000;
        rateMax = 2800000;
      } else {
        rateMin = 3200000;
        rateMax = 4200000;
      }
    }

    // Adjust rate slightly for 2 floors (extra scaffold, column structures, safety)
    const floorMultiplier = floorsCount === 2 ? 1.08 : 1.0;
    
    const calculatedMin = buildingArea * rateMin * floorMultiplier;
    const calculatedMax = buildingArea * rateMax * floorMultiplier;

    // Estimate Months Duration
    let duration = 3;
    if (projectType === 'bangun_baru') {
      if (buildingArea < 50) duration = 3;
      else if (buildingArea <= 120) duration = 5;
      else duration = 7;

      if (floorsCount === 2) duration += 1.5;
    } else {
      // Renovasi
      if (buildingArea < 50) duration = 1.5;
      else if (buildingArea <= 120) duration = 2.5;
      else duration = 4;

      if (floorsCount === 2) duration += 1.0;
    }

    // Material quality adds slight buffer
    if (materialQuality === 'premium') {
      duration += 0.5;
    }

    // Itemized breakdowns in %
    const midPoint = (calculatedMin + calculatedMax) / 2;
    const itemized = [
      {
        category: 'Struktur & Pondasi',
        description: 'Pengecoran sluf, kolom beton, cakar ayam, pasangan dinding bata merah.',
        percentage: 35,
        amount: midPoint * 0.35,
      },
      {
        category: 'Arsitektur & Plesteran',
        description: 'Plester acian dinding, kusen pintu jendela kayu/alumunium, kaca tebal.',
        percentage: 25,
        amount: midPoint * 0.25,
      },
      {
        category: 'Lantai & Finishing Kramik',
        description: 'Homogeneous tile / granit utama, keramik kamar mandi kasar.',
        percentage: 18,
        amount: midPoint * 0.18,
      },
      {
        category: 'Atap & Plafon Gypsum',
        description: 'Baja ringan zinc-alumunium, genteng metal/beton, plafon gypsum hollow.',
        percentage: 12,
        amount: midPoint * 0.12,
      },
      {
        category: 'Instalasi Listrik & Sanitasi Air',
        description: 'Pipa rucika, kabel supreme/eterna, piting saklar kran, tangki air.',
        percentage: 10,
        amount: midPoint * 0.10,
      },
    ];

    setResults({
      minCost: calculatedMin,
      maxCost: calculatedMax,
      estimatedDurationMonths: Math.round(duration * 2) / 2, // Round to nearest 0.5
      itemizedEstimates: itemized,
    });
  }, [projectType, buildingArea, floorsCount, materialQuality]);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleContinue = () => {
    if (results) {
      const typeLabel = projectType === 'bangun_baru' ? 'Bangun Rumah' : 'Renovasi Rumah';
      onContinueToSurvey({
        projectType: typeLabel,
        area: `${buildingArea} m²`,
      });
    }
  };

  return (
    <section id="calculator" className="py-24 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-500 font-mono text-xs font-semibold tracking-widest block uppercase mb-3">
            ESTIMASI ANGGARAN MANDIRI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kalkulator RAB Sederhana MandorJawa
          </h2>
          <p className="text-zinc-400 mt-4 text-sm font-light">
            Hitung perkiraan kasar rencana anggaran biaya bangun baru atau renovasi rumah tinggal Anda secara cepat, transparan, dan realistis sebelum terjadwal survey lapangan.
          </p>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Calculator Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
              <Calculator className="h-6 w-6 text-orange-500" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Parameter Konstruksi</h3>
            </div>

            {/* Input: Jenis Proyek */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 block uppercase tracking-wide">
                Jenis Proyek Konstruksi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="tab-project-bangun"
                  onClick={() => setProjectType('bangun_baru')}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all duration-200 ${
                    projectType === 'bangun_baru'
                      ? 'bg-orange-500 text-zinc-950 border-orange-500 font-extrabold'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  Bangun Baru
                </button>
                <button
                  id="tab-project-renovasi"
                  onClick={() => setProjectType('renovasi')}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all duration-200 ${
                    projectType === 'renovasi'
                      ? 'bg-orange-500 text-zinc-950 border-orange-500 font-extrabold'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  Renovasi Rumah
                </button>
              </div>
            </div>

            {/* Input: Luas Bangunan */}
            <div className="space-y-2 col-span-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-400 block uppercase tracking-wide">
                  Perkiraan Luas Bangunan
                </label>
                <span className="text-orange-400 text-sm font-mono font-bold bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                  {buildingArea} m²
                </span>
              </div>
              <input
                id="range-luas-bangunan"
                type="range"
                min="15"
                max="300"
                step="5"
                value={buildingArea}
                onChange={(e) => setBuildingArea(Number(e.target.value))}
                className="w-full accent-orange-500 h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>15 m² (Tipe 21/Kecil)</span>
                <span>300 m² (Tipe Besar)</span>
              </div>
            </div>

            {/* Input: Jumlah Lantai */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 block uppercase tracking-wide">
                Jumlah Lantai Bangunan
              </label>
              <div className="grid grid-cols-2 gap-3 pb-1">
                <button
                  id="btn-floor-1"
                  onClick={() => setFloorsCount(1)}
                  className={`py-2.5 rounded-lg text-xs font-bold border transition-all duration-150 ${
                    floorsCount === 1
                      ? 'bg-zinc-950 text-white border-orange-500 shadow-sm'
                      : 'bg-zinc-950 text-zinc-500 border-zinc-850 hover:text-zinc-300'
                  }`}
                >
                  1 Lantai Sederhana
                </button>
                <button
                  id="btn-floor-2"
                  onClick={() => setFloorsCount(2)}
                  className={`py-2.5 rounded-lg text-xs font-bold border transition-all duration-150 ${
                    floorsCount === 2
                      ? 'bg-zinc-950 text-white border-orange-500 shadow-sm'
                      : 'bg-zinc-950 text-zinc-500 border-zinc-850 hover:text-zinc-300'
                  }`}
                >
                  2 Lantai Rapi
                </button>
              </div>
            </div>

            {/* Input: Kualitas Material */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 block uppercase tracking-wide">
                Kualitas Bahan Material
              </label>
              <div className="space-y-2.5">
                {[
                  {
                    value: 'standar',
                    label: 'Standar Rakyat',
                    desc: 'Semen Padang/Tiga Roda, keramik Mulia 40x40, cat interior standar, atap metal galvalum.',
                  },
                  {
                    value: 'menengah',
                    label: 'Menengah Rapi (Rekomendasi)',
                    desc: 'Semen Holcim, Homogeneous tile 60x60, cat Jotun, pipa Rucika AW, kusen alumunium tebal.',
                  },
                  {
                    value: 'premium',
                    label: 'Premium Kokoh',
                    desc: 'Semen premium, granit besar, cat Dulux/Weathershield bocor, saniter toto/setara, kusen jati/pilihan.',
                  },
                ].map((qualityOption) => (
                  <label
                    key={qualityOption.value}
                    onClick={() => setMaterialQuality(qualityOption.value as any)}
                    className={`block p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      materialQuality === qualityOption.value
                        ? 'bg-orange-500/5 border-orange-500/80 text-white shadow-inner'
                        : 'bg-zinc-950 border-zinc-850 hover:bg-zinc-950/40 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="quality"
                        checked={materialQuality === qualityOption.value}
                        onChange={() => {}}
                        className="accent-orange-500 h-4 w-4 shrink-0 pointer-events-none"
                      />
                      <span className="text-sm font-bold text-white leading-none block">
                        {qualityOption.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-light block leading-relaxed mt-2 pl-6">
                      {qualityOption.desc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Outputs / Calculations Column */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between h-full">
            {results && (
              <div className="space-y-8">
                
                {/* Score panel estimation */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-850 relative overflow-hidden">
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[11px] text-zinc-400 font-mono uppercase tracking-widest font-semibold block">
                      Rangkuman Estimasi Biaya Kasar
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-white flex flex-col sm:flex-row items-baseline sm:gap-2 leading-tight">
                    <span className="text-orange-500 font-sans">{formatRupiah(results.minCost)}</span>
                    <span className="text-zinc-500 text-xs sm:text-sm font-mono uppercase">s/d</span>
                    <span className="text-white font-sans">{formatRupiah(results.maxCost)}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-850 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider block">Est. Waktu Pengerjaan</span>
                      <span className="text-white text-base font-extrabold">{results.estimatedDurationMonths} Bulan Kalender</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider block">Sistem Pembayaran</span>
                      <span className="text-white text-sm font-extrabold text-orange-400 font-sans">Bertahap (Termin Bukti Progres)</span>
                    </div>
                  </div>
                </div>

                {/* Progressive cost breakdowns */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Info className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                    Estimasi Pembagian Alokasi Dana (RAB)
                  </h4>

                  <div className="space-y-3.5">
                    {results.itemizedEstimates.map((item) => (
                      <div key={item.category} className="space-y-1">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-white font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            {item.category}
                          </span>
                          <span className="text-zinc-400 font-mono font-bold">
                            {formatRupiah(item.amount)} ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-850/50">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-500 block leading-tight pt-0.5">
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Caution Disclaimer */}
                <div className="p-4 bg-orange-500/5 text-xs text-orange-300 rounded-xl border border-orange-500/15 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 shrink-0 select-none" />
                  <p className="leading-relaxed font-light">
                    <strong>Disclaimer:</strong> Estimasi di atas adalah hasil kalkulasi matematika internal standar MandorJawa berdasarkan luas bangunan meter persegi yang dimasukkan. Anggaran aslinya (RAB Tetap) dapat bervariasi bergantung pada struktur tanah, kemudahan akses truk material, dan desain arsitektur aslinya yang akan disepakati pasca survey gratis.
                  </p>
                </div>

              </div>
            )}

            {/* Link button to Survey step */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <button
                id="btn-calculator-lanjut-survey"
                onClick={handleContinue}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-zinc-950 font-extrabold px-6 py-4 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5 text-base"
              >
                <ClipboardCheck className="h-5 w-5" />
                <span>Lanjut Jadwalkan Survey Proyek Secara Gratis</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
