import React from 'react';
import { ShieldCheck, Award, Wrench, Layers, CheckCircle2, Phone, MessageCircle, MapPin } from 'lucide-react';
import { COMPANY_INFO, MANUFACTURING_STEPS } from '../data/trailers';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFBF7] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="border-b border-[#EFE8DF] pb-8 space-y-3">
          <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
            ABOUT SAMEER TRAILERS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#3B3A3A] font-heading">
            Engineering High-Performance Trailers Since Inception
          </h1>
          <p className="text-xs sm:text-sm text-[#736F6A] max-w-2xl leading-relaxed">
            Based in Bhilwara, Rajasthan, Sameer Trailers is committed to building commercial vehicles that deliver maximum payload, structural longevity, and road safety across India.
          </p>
        </div>

        {/* Company Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-[#3B3A3A] font-heading">
              Our Vision: Strength, Reliability & Zero Compromise
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
              We design and manufacture heavy-duty tipping trailers, flatbed cargo platforms, dry bulk tankers, and custom truck bodies tailored to the demanding conditions of Indian transportation.
            </p>
            <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
              By combining high-tensile structural steel, automated submerged arc beam welding, and thorough multi-stage quality inspections, we ensure every trailer that rolls out of our Bhilwara plant gives fleet operators trouble-free performance for years.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-[#EFE8DF]">
                <ShieldCheck className="w-6 h-6 text-[#F68722] mb-1.5" />
                <span className="text-xs font-black text-[#3B3A3A] block">ARAI Approved</span>
                <span className="text-[11px] text-[#736F6A]">100% CMVR Homologated</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#EFE8DF]">
                <Award className="w-6 h-6 text-[#F68722] mb-1.5" />
                <span className="text-xs font-black text-[#3B3A3A] block">High-Grade Steel</span>
                <span className="text-[11px] text-[#736F6A]">DOMEX & BSK-46 Metallurgy</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#F5EFE8] border border-[#EFE8DF] shadow-xl">
              <img
                src={COMPANY_INFO.heroImage}
                alt="Sameer Trailers Facility"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* Manufacturing Process */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#F68722] uppercase font-mono-specs">OUR METHODOLOGY</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#3B3A3A] font-heading">
              Our 6-Stage Manufacturing Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MANUFACTURING_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-3xl border border-[#EFE8DF] p-6 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#F68722]/10 text-[#F68722] text-xs font-bold font-mono-specs rounded-md">
                    {step.title}
                  </span>
                  <span className="text-2xl font-black text-[#EFE8DF] font-mono-specs">{step.number}</span>
                </div>
                <h3 className="text-sm font-black text-[#3B3A3A] font-heading">{step.subtitle}</h3>
                <p className="text-xs text-[#736F6A] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facility CTA Banner */}
        <div className="bg-[#3B3A3A] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-[#F68722] text-white text-[10px] font-black uppercase rounded-md">
              FACTORY AUDIT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading">
              Schedule a Visit to Our Manufacturing Plant
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Inspect our automated beam welding lines, heavy chassis fabrication bays, and shot-blasting booth in Bhilwara, Rajasthan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="py-3.5 px-6 bg-[#F68722] hover:bg-[#e07414] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#F68722]/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Schedule Plant Visit</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
