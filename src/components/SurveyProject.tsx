import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Home, 
  Building2, 
  Wrench, 
  ChevronRight, 
  User, 
  Phone, 
  Wallet, 
  Calendar, 
  Send,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { SurveyState } from '../types';

interface SurveyProjectProps {
  key?: string;
  initialProjectType?: string;
  initialArea?: string;
}

export default function SurveyProject({ initialProjectType = '', initialArea = '' }: SurveyProjectProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form states
  const [formData, setFormData] = useState<SurveyState>({
    projectType: '',
    buildingArea: '',
    location: '',
    budget: '',
    targetStart: '',
    clientName: '',
    clientPhone: '',
  });

  const [formErrors, setFormErrors] = useState<string>('');
  const [surveyCompleted, setSurveyCompleted] = useState<boolean>(false);

  // Sync initial params passed from calculation trigger
  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialProjectType,
      }));
      // Jump directly to step 2 if they started from calculator
      setStep(2);
    }
    if (initialArea) {
      setFormData((prev) => ({
        ...prev,
        buildingArea: initialArea,
      }));
    }
  }, [initialProjectType, initialArea]);

  const handleSelectOption = (field: keyof SurveyState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors('');
  };

  const handleTextChange = (field: keyof SurveyState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors('');
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.projectType) {
          setFormErrors('Silakan pilih salah satu jenis proyek.');
          return false;
        }
        break;
      case 2:
        if (!formData.buildingArea.trim()) {
          setFormErrors('Silakan masukkan luas bangunan (contoh: 80 m² atau 6x12).');
          return false;
        }
        break;
      case 3:
        if (!formData.location.trim()) {
          setFormErrors('Silakan masukkan lokasi spesifik (contoh: Kembangan, Jakarta Barat).');
          return false;
        }
        break;
      case 4:
        if (!formData.budget) {
          setFormErrors('Silakan tentukan kisaran budget Anda.');
          return false;
        }
        break;
      case 5:
        if (!formData.targetStart) {
          setFormErrors('Silakan pilih target waktu mulai pekerjaan.');
          return false;
        }
        break;
      case 6:
        if (!formData.clientName.trim()) {
          setFormErrors('Silakan masukkan nama lengkap Anda.');
          return false;
        }
        break;
      case 7:
        // WhatsApp validation
        const cleanedPhone = formData.clientPhone.replace(/[^0-9]/g, '');
        if (cleanedPhone.length < 9) {
          setFormErrors('Silakan masukkan nomor WhatsApp yang aktif dan valid.');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep((prev) => prev + 1);
      } else {
        setSurveyCompleted(true);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setFormErrors('');
    }
  };

  const resetSurvey = () => {
    setFormData({
      projectType: '',
      buildingArea: '',
      location: '',
      budget: '',
      targetStart: '',
      clientName: '',
      clientPhone: '',
    });
    setStep(1);
    setSurveyCompleted(false);
    setFormErrors('');
  };

  // WhatsApp Send trigger
  const handleSendToWhatsApp = () => {
    const waNumber = '628118220123';
    
    // Formatting exact auto format message
    const message = `Halo MandorJawa,

Saya telah mengisi survey proyek.

Nama:
${formData.clientName}

Jenis Proyek:
${formData.projectType}

Lokasi:
${formData.location}

Luas:
${formData.buildingArea}

Budget:
${formData.budget}

Target Mulai:
${formData.targetStart}

Mohon konsultasi lebih lanjut.`;

    const cleanMessage = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${cleanMessage}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="survey" className="py-24 bg-zinc-900 border-b border-zinc-950 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-mono text-xs font-semibold tracking-widest block uppercase mb-3">
            SURVEY & PRE-KUALIFIKASI KLIEN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Formulir Survey Proyek Terencana
          </h2>
          <p className="text-zinc-400 mt-3 text-sm font-light">
            Sesuai komitmen profesional MandorJawa, mohon isi 7 pertanyaan singkat di bawah untuk menyaring kebutuhan Anda sebelum lanjut berkonsultasi via WhatsApp bersama staf lapangan.
          </p>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Wizard Container */}
        <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!surveyCompleted ? (
              <motion.div
                key="wizard-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Header Wizard & Progress Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-zinc-850">
                  <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest bg-orange-500/5 px-2.5 py-1 rounded border border-orange-500/10">
                    Langkah {step} dari {totalSteps}
                  </span>
                  
                  {/* Visual segment progress bar */}
                  <div className="w-full sm:w-48 bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800/80">
                    <div
                      className="bg-orange-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                {/* STEP Contents */}
                <div className="min-h-[220px]">
                  
                  {/* Step 1: Jenis Proyek */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Home className="text-orange-500 h-5.5 w-5.5" />
                        Apa jenis proyek yang Anda rencanakan?
                      </h3>
                      <p className="text-xs text-zinc-500 font-light pb-2">
                        Pilih opsi paling sesuai yang menggambarkan target pembangunan Anda.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          { value: 'Bangun Rumah', label: 'Bangun Rumah Baru', icon: Home },
                          { value: 'Renovasi Rumah', label: 'Renovasi Rumah Tinggal', icon: Wrench },
                          { value: 'Renovasi Ruko', label: 'Renovasi Ruko / Unit Usaha', icon: Building2 },
                          { value: 'Kanopi', label: 'Pasang Kanopi Baja Ringan', icon: Wrench },
                          { value: 'Pagar', label: 'Pemasangan Pagar Minimalis', icon: Wrench },
                          { value: 'Interior', label: 'Pekerjaan Desain & Interior', icon: Home },
                          { value: 'Lainnya', label: 'Lainnya (Perbaikan Kecil/Atap/Semen)', icon: Wrench },
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isSelected = formData.projectType === item.value;
                          return (
                            <button
                              id={`survey-opt-type-${item.value.toLowerCase()}`}
                              key={item.value}
                              type="button"
                              onClick={() => handleSelectOption('projectType', item.value)}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 outline-none ${
                                isSelected
                                  ? 'bg-orange-500/10 border-orange-500 text-white shadow-md'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                              }`}
                            >
                              <div className="flex items-center space-x-3.5">
                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-zinc-950' : 'bg-zinc-950 text-zinc-500'}`}>
                                  <IconComp className="h-4.5 w-4.5" />
                                </div>
                                <span className="font-semibold text-sm">{item.label}</span>
                              </div>
                              {isSelected && <Check className="h-4.5 w-4.5 text-orange-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Luas Bangunan */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Building2 className="text-orange-500 h-5.5 w-5.5" />
                        Berapa perkiraan luas bangunan atau ukuran lahan?
                      </h3>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">
                        Jika tidak tahu persis, Anda bisa mengisinya dengan estimasi luas tapak atau dimensi lahan (misal: 60 m², Tipe 36, atau ukuran 6m x 15m).
                      </p>
                      
                      <div className="pt-2">
                        <input
                          id="input-survey-luas"
                          type="text"
                          value={formData.buildingArea}
                          onChange={(e) => handleTextChange('buildingArea', e.target.value)}
                          placeholder="Masukkan ukuran, contoh: 85 m² atau 6x12 meter"
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white text-base py-3 px-4 rounded-xl focus:outline-none transition-all duration-150 shadow-inner font-sans"
                        />
                      </div>

                      {/* Quick helpers buttons */}
                      <div className="flex flex-wrap gap-2.5 pt-4">
                        {['45 m²', '72 m²', '100 m²', '150 m²', 'Lebar 6m x 12m', 'Lebar 8m x 15m'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleSelectOption('buildingArea', preset)}
                            className="bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 font-medium font-mono px-3 py-2 rounded-lg"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Lokasi Proyek */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <MapPin className="text-orange-500 h-5.5 w-5.5" />
                        Dimana lokasi rencana pengerjaan proyek Anda?
                      </h3>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">
                        Tentukan kelurahan/kecamatan dan kota. MANDORJAWA berfokus melayani wilayah Jakarta Barat dan sekitarnya (Kembangan, Joglo, Meruya, Kebon Jeruk, dsb).
                      </p>
                      
                      <div className="pt-2">
                        <input
                          id="input-survey-lokasi"
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleTextChange('location', e.target.value)}
                          placeholder="Contoh: Joglo, Kembangan, Jakarta Barat"
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white text-base py-3 px-4 rounded-xl focus:outline-none transition-all duration-150 shadow-inner"
                        />
                      </div>

                      {/* Quick location presets */}
                      <div className="flex flex-wrap gap-2.5 pt-4">
                        {['Joglo, Kembangan', 'Meruya, Kembangan', 'Kedoya, Kebon Jeruk', 'Cengkareng, Jakbar', 'Tangerang Kota'].map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => handleSelectOption('location', loc)}
                            className="bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 font-medium px-3 py-2 rounded-lg"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Budget */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Wallet className="text-orange-500 h-5.5 w-5.5" />
                        Berapa alokasi budget/anggaran yang disiapkan?
                      </h3>
                      <p className="text-xs text-zinc-500 font-light">
                        Pilihan ini membantu tim merancang pemilihan material yang sesuai dengan batas kantong Anda.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {[
                          '< 100 juta',
                          '100 - 250 juta',
                          '250 - 500 juta',
                          '500 juta - 1 M',
                          '> 1 M',
                        ].map((budgetOption) => {
                          const isSelected = formData.budget === budgetOption;
                          return (
                            <button
                              id={`survey-opt-budget-${budgetOption.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`}
                              key={budgetOption}
                              type="button"
                              onClick={() => handleSelectOption('budget', budgetOption)}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                                isSelected
                                  ? 'bg-orange-500/10 border-orange-500 text-white font-bold'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              <span className="text-sm">{budgetOption}</span>
                              {isSelected && <Check className="h-4.5 w-4.5 text-orange-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Target Mulai */}
                  {step === 5 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calendar className="text-orange-500 h-5.5 w-5.5" />
                        Kapan rencana pengerjaan fisik akan dimulai?
                      </h3>
                      <p className="text-xs text-zinc-500 font-light">
                        Tentukan tingkat kesiapan proyek fisik Anda di lapangan.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {[
                          { value: 'Secepatnya', label: 'Secepatnya (Sudah siap lahan & budget)' },
                          { value: '1 Bulan', label: 'Mulai 1 bulan ke depan' },
                          { value: '3 Bulan', label: 'Mulai 3 bulan ke depan' },
                          { value: '6 Bulan', label: 'Mulai 6 bulan ke depan / Masih nego lahan' },
                        ].map((targetOption) => {
                          const isSelected = formData.targetStart === targetOption.value;
                          return (
                            <button
                              id={`survey-opt-target-${targetOption.value.toLowerCase()}`}
                              key={targetOption.value}
                              type="button"
                              onClick={() => handleSelectOption('targetStart', targetOption.value)}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                                isSelected
                                  ? 'bg-orange-500/10 border-orange-500 text-white font-bold'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              <span className="text-sm">{targetOption.label}</span>
                              {isSelected && <Check className="h-4.5 w-4.5 text-orange-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 6: Nama */}
                  {step === 6 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="text-orange-500 h-5.5 w-5.5" />
                        Bisa kami tahu nama lengkap Anda?
                      </h3>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">
                        Staf lapangan kami akan memanggil dan menyapa dengan sopan sesuai nama yang Anda daftarkan di sini.
                      </p>
                      
                      <div className="pt-2">
                        <input
                          id="input-survey-nama"
                          type="text"
                          value={formData.clientName}
                          onChange={(e) => handleTextChange('clientName', e.target.value)}
                          placeholder="Masukkan nama lengkap Anda"
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white text-base py-3 px-4 rounded-xl focus:outline-none transition-all duration-150"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 7: Nomor WhatsApp */}
                  {step === 7 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Phone className="text-orange-500 h-5.5 w-5.5" />
                        Berapa nomor WhatsApp aktif Anda?
                      </h3>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">
                        Kami akan mengirimkan rangkuman dan menghubungi Anda langsung melalui WhatsApp ini untuk koordinasi lebih lanjut.
                      </p>
                      
                      <div className="pt-2">
                        <input
                          id="input-survey-whatsapp"
                          type="tel"
                          value={formData.clientPhone}
                          onChange={(e) => handleTextChange('clientPhone', e.target.value)}
                          placeholder="Contoh: 08123456789 atau +62811..."
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white text-lg py-3.5 px-4 rounded-xl focus:outline-none transition-all duration-150 font-mono"
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Display validation error message */}
                {formErrors && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-red-500/15 border border-red-500/30 text-xs text-red-400 rounded-lg flex items-center"
                  >
                    <span>{formErrors}</span>
                  </motion.div>
                )}

                {/* Left/Right Wizard Stepper Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-zinc-850">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                      step === 1
                        ? 'text-zinc-650 cursor-not-allowed opacity-50'
                        : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    <ArrowLeft className="h-4.5 w-4.5" />
                    <span>Kembali</span>
                  </button>

                  <button
                    id="btn-survey-wizard-lanjut"
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/10 transition-all duration-200 transform hover:-translate-y-0.5 text-sm"
                  >
                    <span>{step === totalSteps ? 'Selesaikan Survey' : 'Lanjutkan'}</span>
                    <ArrowRight className="h-4.5 w-4.5 stroke-[2.5]" />
                  </button>
                </div>

              </motion.div>
            ) : (
              /* Success / Survey completed summary sheet with WhatsApp click action button */
              <motion.div
                key="survey-summary"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="text-center space-y-3 pb-6 border-b border-zinc-850">
                  <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-full inline-flex items-center justify-center text-orange-400 mb-2">
                    <Sparkles className="h-7 w-7 text-orange-500 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    Survey Anda Berhasil Selesai!
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-lg mx-auto font-light leading-relaxed">
                    Terima kasih telah meluangkan waktu berharga Anda. Berikut adalah ringkasan survey kualifikasi proyek Anda bersama PT KOKI (MANDORJAWA):
                  </p>
                </div>

                {/* Beautiful summary cards of input properties */}
                <div className="bg-zinc-900/50 border border-zinc-850 rounded-2xl p-6 space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="pb-3 border-b border-zinc-800 sm:border-r sm:border-b-0 pr-4">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono block mb-1">Daftar Atas Nama</span>
                    <span className="text-white text-base font-extrabold flex items-center gap-1.5">
                      <User className="h-4 w-4 text-orange-500" /> {formData.clientName}
                    </span>
                  </div>

                  <div className="pb-3 border-b border-zinc-800 sm:border-b-0 pl-1">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono block mb-1">Nomor Kontak WhatsApp</span>
                    <span className="text-emerald-400 text-sm font-mono font-bold flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-emerald-500" /> {formData.clientPhone}
                    </span>
                  </div>

                  <div className="col-span-1 sm:col-span-2 border-t border-zinc-850 pt-3"></div>

                  <div className="space-y-1.5">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono block">Jenis Pekerjaan</span>
                    <span className="text-white text-sm font-bold bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800 inline-block">
                      {formData.projectType}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono block">Dimensi / Luas Bangunan</span>
                    <span className="text-white text-sm font-bold bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800 inline-block">
                      {formData.buildingArea}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono block">Lokasi Pengerjaan</span>
                    <span className="text-white text-sm font-bold flex items-center gap-1.5 text-orange-400">
                      <MapPin className="h-4 w-4 text-orange-400" /> {formData.location}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono block">Alokasi Anggaran (Budget)</span>
                    <span className="text-white text-sm font-bold text-amber-500 bg-zinc-950/80 px-2.5 py-1 rounded inline-block border border-zinc-800">
                      Rp {formData.budget}
                    </span>
                  </div>

                  <div className="col-span-1 sm:col-span-2 space-y-1.5">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono block">Rencana Tanggal Mulai</span>
                    <span className="text-white text-xs font-semibold bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800 inline-block">
                      Mulai Fisik: {formData.targetStart}
                    </span>
                  </div>
                </div>

                {/* Primary whatsapp dispatch launcher banner */}
                <div className="bg-emerald-950/25 border border-emerald-500/20 p-5 rounded-2xl space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md shrink-0">
                      <Send className="h-4.5 w-4.5 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white leading-none">Siap Berkonsultasi via WhatsApp</h4>
                      <p className="text-[11.5px] text-zinc-400 leading-relaxed font-light">
                        Klik tombol di bawah untuk mengirim data survey ini ke WhatsApp MandorJawa resmi secara otomatis. Tim kami akan segera merespons & menjadwalkan survey lapangan ke lokasi Anda.
                      </p>
                    </div>
                  </div>

                  <button
                    id="btn-kirim-whatsapp-survey"
                    onClick={handleSendToWhatsApp}
                    className="w-full flex items-center justify-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <Send className="h-5 w-5 fill-zinc-950" />
                    <span className="text-sm tracking-wider uppercase font-extrabold">Kirim Hasil Survey ke WhatsApp MandorJawa</span>
                  </button>
                </div>

                {/* Reset button to clear inputs */}
                <div className="text-center pt-2">
                  <button
                    onClick={resetSurvey}
                    className="text-xs text-zinc-500 hover:text-zinc-300 font-medium inline-flex items-center gap-1.5 hover:underline"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Buka Survey Ulang
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
