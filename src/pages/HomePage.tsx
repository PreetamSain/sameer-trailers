import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Scale,
  Flame,
  Layers,
  Pickaxe,
  Building2,
  Ship,
  Factory,
  CheckCircle,
  Truck
} from 'lucide-react';
import {
  PRODUCTS_LIST,
  MANUFACTURING_STEPS,
  QUALITY_POINTS,
  ENGINEERING_PILLARS,
  INDUSTRY_SECTORS,
  FAQ_LIST,
  COMPANY_INFO
} from '../data/trailers';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { HeroParticles } from '../components/HeroParticles';
import { ScrollOrangeBurnCard } from '../components/ScrollOrangeBurnCard';
import { motion, AnimatePresence } from 'framer-motion';

export const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      
      {/* 1. HERO SECTION WITH SUBTLE PARTICLES */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#EFE8DF]">
        {/* Subtle, non-intrusive floating particle canvas */}
        <HeroParticles />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="text-xs sm:text-sm font-black text-[#3B3A3A] tracking-[0.25em] uppercase font-heading">
                MADE IN INDIA
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#3B3A3A] tracking-tight leading-[1.06] font-heading">
                BUILT TO PERFORM. <br />
                <span className="text-[#F68722]">BUILT TO LAST.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#736F6A] max-w-xl leading-relaxed font-medium">
                We manufacture high-performance trailers designed to handle the toughest loads, harshest terrains, and longest hauls. When strength, safety, and reliability matter, our engineering delivers without compromise.
              </p>

              {/* CTAs (Only 2 Clean Action Buttons) */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="py-3.5 px-8 bg-[#F68722] hover:bg-[#e07414] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-[#F68722]/25 hover:shadow-xl hover:shadow-[#F68722]/35 active:scale-95 transition-all group cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="py-3.5 px-8 bg-[#3B3A3A] hover:bg-[#222222] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>Request Quote</span>
                </Link>
              </div>

              {/* Trust Badges with Animated Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EFE8DF] max-w-lg">
                <div>
                  <div className="text-sm font-black text-[#3B3A3A] font-mono-specs">ARAI AIS-113</div>
                  <div className="text-[11px] text-[#736F6A]">100% Homologated</div>
                </div>
                <div>
                  <div className="text-sm font-black text-[#F68722] font-mono-specs">
                    <AnimatedCounter end={700} suffix=" MPa" />
                  </div>
                  <div className="text-[11px] text-[#736F6A]">High-Tensile Steel</div>
                </div>
                <div>
                  <div className="text-sm font-black text-[#3B3A3A] font-mono-specs">
                    <AnimatedCounter end={55} suffix="T+ Max" />
                  </div>
                  <div className="text-[11px] text-[#736F6A]">Payload Capacity</div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image (Brochure Offset Accent Frame Design - Scaled Up & Clean) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-6 flex items-center justify-center p-1 sm:p-2"
            >
              <div className="relative w-full group cursor-pointer">
                {/* 1. Offset Brand Orange (#F68722) Backdrop Frame */}
                <div className="absolute inset-0 bg-[#F68722] rounded-3xl translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300 -z-10" />

                {/* 2. Main Foreground Image Container with transparent frame / hero image */}
                <div className="relative w-full bg-white rounded-3xl p-3 sm:p-5 border-2 border-[#EFE8DF] overflow-hidden group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center min-h-[340px] sm:min-h-[420px]">
                  <img
                    src="/assets/brochure-asset-21.png"
                    alt="Sameer Commercial Trailer — Engineered Heavy Transport"
                    className="w-full h-auto max-h-[440px] sm:max-h-[500px] object-contain rounded-2xl scale-[1.06] sm:scale-[1.10] group-hover:scale-[1.14] transition-transform duration-500 drop-shadow-xl"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS ("WHAT WE BUILD") */}
      <section className="py-16 md:py-24 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EFE8DF] pb-4"
          >
            <div>
              <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
                OUR PRODUCT LINEUP
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#3B3A3A] font-heading mt-1">
                WHAT WE BUILD
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-[#F68722] hover:text-[#e07414] flex items-center gap-1 transition-colors group cursor-pointer"
            >
              <span>View All Categories</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Cards Reveal Immediately without blank waiting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS_LIST.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="bg-white rounded-3xl border border-[#EFE8DF] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#F68722]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full justify-between cursor-pointer"
                >
                  <div className="aspect-[16/11] bg-[#F5EFE8] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-[#3B3A3A] font-heading group-hover:text-[#F68722] transition-colors">
                        {product.categoryTitle}
                      </h3>
                      <p className="text-xs text-[#736F6A] line-clamp-2 mt-1 leading-relaxed">
                        {product.shortDesc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EFE8DF] flex items-center justify-between text-xs font-bold text-[#F68722]">
                      <span>View Specifications</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. ENGINEERING & METALLURGY EXCELLENCE */}
      <section className="py-16 md:py-24 bg-white border-y border-[#EFE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
              HIGH-GRADE METALLURGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#3B3A3A] font-heading">
              Engineering Advantages That Deliver
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A]">
              Our advanced steel fabrication techniques save dead weight while guaranteeing structural rigidity across millions of highway kilometers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollOrangeBurnCard
              icon={<ShieldCheck className="w-6 h-6" />}
              tag="700 MPa YIELD"
              title="DOMEX 700 High-Yield Steel"
              description="Ultra-high yield strength steel prevents longitudinal beam bending, sag, and stress fatigue under continuous heavy loads."
              baseBg="bg-[#FFFBF7]"
            />

            <ScrollOrangeBurnCard
              icon={<Scale className="w-6 h-6" />}
              tag="-1,800 KG TARE"
              title="Optimized Dead Weight"
              description="Lighter tare dead-weight enables fleet transporters to legally carry up to 1.8 metric tons more revenue freight per trip."
              baseBg="bg-[#FFFBF7]"
            />

            <ScrollOrangeBurnCard
              icon={<Flame className="w-6 h-6" />}
              tag="100% PENETRATION"
              title="Robotic Submerged Arc Welding"
              description="Automatic double-sided continuous submerged arc welding (SAW) on main I-beams eliminates human welding defects."
              baseBg="bg-[#FFFBF7]"
            />

            <ScrollOrangeBurnCard
              icon={<Sparkles className="w-6 h-6" />}
              tag="SA 2.5 SURFACE"
              title="Shot Blasting & 2K PU Paint"
              description="Steel shot-blasted to white metal followed by zinc-rich primer and heavy 2K polyurethane paint for 10+ year corrosion shield."
              baseBg="bg-[#FFFBF7]"
            />
          </div>

        </div>
      </section>

      {/* 4. "DESIGNED FOR MAXIMUM PAYLOAD" BANNER */}
      <section className="py-16 bg-[#3B3A3A] text-white relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#F68722]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-8 space-y-3">
              <span className="px-3 py-1 bg-[#F68722] text-white text-[10px] font-black uppercase tracking-wider rounded-md inline-block">
                HIGH EFFICIENCY ENGINEERING
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
                DESIGNED FOR MAXIMUM PAYLOAD
              </h2>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                Every trailer is engineered to reduce tare dead-weight while providing unyielding structural integrity, giving fleet operators more legal cargo capacity and better fuel economics.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                to="/contact"
                className="py-3.5 px-6 bg-[#F68722] hover:bg-[#e07414] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl text-center shadow-lg shadow-[#F68722]/30 active:scale-95 transition-all"
              >
                REQUEST FACTORY QUOTE
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl text-center border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F68722]" />
                <span>Call: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. INDUSTRY SECTOR & CARGO APPLICATIONS */}
      <section className="py-16 md:py-24 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
              CARGO & FLEET VERTICALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#3B3A3A] font-heading">
              Serving India's Core Transport Sectors
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A]">
              Specialized configurations purpose-built for heavy commodities and high-speed highway transit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRY_SECTORS.map((sec, idx) => (
              <ScrollOrangeBurnCard
                key={idx}
                icon={
                  idx === 0 ? <Pickaxe className="w-6 h-6" /> :
                  idx === 1 ? <Building2 className="w-6 h-6" /> :
                  idx === 2 ? <Ship className="w-6 h-6" /> :
                  <Factory className="w-6 h-6" />
                }
                tag="KEY LOGISTICS VERTICAL"
                title={sec.title}
                description={sec.desc}
                footerLabel="Typical Cargo:"
                footerValue={sec.cargo}
                baseBg="bg-white"
              />
            ))}
          </div>

        </div>
      </section>

      {/* 6. "STRENGTH THAT SETS US APART" */}
      <section className="py-16 md:py-24 bg-white border-y border-[#EFE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
              ENGINEERING EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#3B3A3A] font-heading">
              STRENGTH THAT SETS US APART
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A]">
              Built with precision metallurgy, automated welding, and rigorous testing for dependable road performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUALITY_POINTS.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#FFFBF7] rounded-3xl border border-[#EFE8DF] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="aspect-[16/10] bg-[#F5EFE8] overflow-hidden">
                  <img
                    src={point.image}
                    alt={point.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-sm font-black text-[#3B3A3A] font-heading">
                    {point.title}
                  </h3>
                  <p className="text-xs text-[#736F6A] leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. "WHY CHOOSE US" / 6-STEP MANUFACTURING PROCESS */}
      <section className="py-16 md:py-24 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#3B3A3A] font-heading">
              Quality That You Can Trust
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A]">
              We use the best materials and advanced technology to manufacture trailers that ensure durability and high performance.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MANUFACTURING_STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="bg-white rounded-3xl border border-[#EFE8DF] p-6 shadow-sm space-y-4 hover:shadow-xl hover:border-[#F68722]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#F68722]/10 text-[#F68722] text-xs font-black font-mono-specs rounded-lg">
                    {step.title}
                  </span>
                  <span className="text-2xl font-black text-[#EFE8DF] font-mono-specs">
                    {step.number}
                  </span>
                </div>

                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#F5EFE8]">
                  <img
                    src={step.image}
                    alt={step.subtitle}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-black text-[#3B3A3A] font-heading">
                    {step.subtitle}
                  </h3>
                  <p className="text-xs text-[#736F6A] leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) WITH SILKY SMOOTH ACCORDION */}
      <section className="py-16 md:py-24 bg-white border-t border-[#EFE8DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#3B3A3A] font-heading">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A]">
              Key technical and compliance questions answered for commercial fleet operators and logistics managers.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#FFFBF7] border-[#F68722]/50 shadow-md'
                      : 'bg-white border-[#EFE8DF] hover:border-[#DED5C9]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#3B3A3A] hover:text-[#F68722] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#F68722] text-white' : 'bg-[#FFFBF7] border border-[#EFE8DF] text-[#736F6A]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#736F6A] leading-relaxed border-t border-[#EFE8DF]/60">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. GET IN TOUCH FOOTER BANNER */}
      <section className="py-16 bg-[#3B3A3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-2"
          >
            <h2 className="text-2xl sm:text-4xl font-black font-heading">
              Looking for a Reliable Commercial Trailer?
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Contact our sales engineering team in Bhilwara, Rajasthan for customized specifications, pricing, and delivery timelines.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="py-3.5 px-8 bg-[#F68722] hover:bg-[#e07414] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#F68722]/25 active:scale-95 transition-all"
            >
              Request a Quotation
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center gap-2 border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F68722]" />
              <span>Call Us: {COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
