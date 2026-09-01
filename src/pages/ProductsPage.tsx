import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_LIST, COMPANY_INFO } from '../data/trailers';
import { ArrowRight, CheckCircle2, Phone, Sparkles, ShieldCheck } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS_LIST
    : PRODUCTS_LIST.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FFFBF7] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-[#EFE8DF] pb-6 space-y-2">
          <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
            COMMERCIAL VEHICLE PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#3B3A3A] font-heading">
            Our Products & Fleet
          </h1>
          <p className="text-xs sm:text-sm text-[#736F6A] max-w-2xl leading-relaxed">
            Engineered for high payload efficiency, rugged road durability, and strict ARAI & CMVR compliance. Explore our complete range of commercial transport solutions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'tippers', label: 'Tippers' },
            { id: 'trailers', label: 'Trailers' },
            { id: 'bulkers', label: 'Bulkers / Tankers' },
            { id: 'body-builders', label: 'Body Builders' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#F68722] text-white shadow-md shadow-[#F68722]/25'
                  : 'bg-white text-[#3B3A3A] border border-[#EFE8DF] hover:bg-[#F5EFE8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Stack */}
        <div className="space-y-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#EFE8DF] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#F68722]/40 transition-all duration-300 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Image */}
                <div className="lg:col-span-5 aspect-[16/11] rounded-2xl overflow-hidden bg-[#F5EFE8] group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Right Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <span className="text-xs font-bold text-[#F68722] uppercase font-mono-specs">
                      {product.categoryTitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#3B3A3A] font-heading mt-0.5">
                      {product.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#736F6A] mt-2 leading-relaxed">
                      {product.fullDesc}
                    </p>
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-medium text-[#3B3A3A]">
                        <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Specs Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    {product.specs.slice(0, 4).map((spec, idx) => (
                      <div key={idx} className="bg-[#FFFBF7] p-2.5 rounded-xl border border-[#EFE8DF]">
                        <span className="text-[10px] text-[#736F6A] font-bold block uppercase">{spec.label}</span>
                        <span className="text-xs font-bold text-[#3B3A3A] font-mono-specs truncate block">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#EFE8DF]">
                    <Link
                      to={`/products/${product.slug}`}
                      className="py-3 px-6 bg-[#3B3A3A] hover:bg-[#202020] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <span>Full Technical Specifications</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to="/contact"
                      className="py-3 px-5 bg-[#F68722] hover:bg-[#e07414] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md shadow-[#F68722]/20 transition-all"
                    >
                      <span>Get Custom Quote</span>
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
