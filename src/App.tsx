/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import ProjectGallery from './components/ProjectGallery';
import RABCalculator from './components/RABCalculator';
import SurveyProject from './components/SurveyProject';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset slightly to account for fixed navbar height in desktop
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectService = (serviceType: string) => {
    setSelectedServiceType(serviceType);
    setSelectedArea(''); // Clear any previous calculator area defaults
    
    // Smooth scroll down to survey section
    setTimeout(() => {
      handleNavigate('survey');
    }, 50);
  };

  const handleContinueToSurvey = (data: { projectType: string; area: string }) => {
    setSelectedServiceType(data.projectType);
    setSelectedArea(data.area);

    // Smooth scroll down to survey section
    setTimeout(() => {
      handleNavigate('survey');
    }, 50);
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans antialiased selection:bg-orange-500 selection:text-zinc-950">
      {/* Dynamic Header navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* Competencies and why choose us */}
        <WhyChooseUs />

        {/* Services / Layanan catalogue */}
        <Services onSelectService={handleSelectService} />

        {/* Work portfolio gallery */}
        <ProjectGallery />

        {/* Interactive Estimator / RAB calculator */}
        <RABCalculator onContinueToSurvey={handleContinueToSurvey} />

        {/* Mandatory Survey Pre-qualification & WhatsApp funnel */}
        <SurveyProject 
          key={`${selectedServiceType}-${selectedArea}`} // Re-mounts component when values update to trigger effect sync
          initialProjectType={selectedServiceType} 
          initialArea={selectedArea} 
        />

        {/* Authenticated Client Testimonials */}
        <Testimonials />

        {/* Question Answers (FAQ) */}
        <FAQ />
      </main>

      {/* Corporate Foot footer layout */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

