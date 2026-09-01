import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS_LIST, COMPANY_INFO } from '../data/trailers';
import { ArrowLeft, CheckCircle2, Phone, ArrowRight, ShieldCheck, Download, Award, FileText } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS_LIST.find((p) => p.slug === slug) || PRODUCTS_LIST[0];
  const relatedProducts = PRODUCTS_LIST.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-[#FFFBF7] py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3B3A3A] hover:text-[#F68722] bg-white px-3.5 py-2 rounded-xl border border-[#EFE8DF] shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Image & Trust */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[16/11] bg-white rounded-3xl overflow-hidden border border-[#EFE8DF] shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EFE8DF] flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#F68722] shrink-0" />
              <div className="text-xs text-[#3B3A3A]">
                <span className="font-bold block">ARAI AIS-113 & CMVR Certified</span>
                Full invoice, compliance certificates, and chassis warranty for seamless RTO registration.
              </div>
            </div>
          </div>

          {/* Right Details & Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="px-3 py-1 bg-[#F68722]/10 text-[#F68722] text-xs font-black uppercase font-mono-specs rounded-md inline-block mb-2">
                {product.categoryTitle}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#3B3A3A] font-heading leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#736F6A] mt-3 leading-relaxed">
                {product.fullDesc}
              </p>
            </div>

            {/* Quick Quotation Card */}
            <div className="bg-[#3B3A3A] text-white p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F68722] font-mono-specs">
                  Factory Direct Pricing
                </span>
                <span className="text-xs font-bold text-emerald-400">Direct Plant Delivery</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="flex-1 py-3.5 px-4 bg-[#F68722] hover:bg-[#e07414] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#F68722]/30 transition-all active:scale-95 text-center"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Official Quotation</span>
                </Link>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="py-3.5 px-5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F68722]" />
                  <span>Call Plant</span>
                </a>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white p-6 rounded-3xl border border-[#EFE8DF] space-y-3">
              <h3 className="text-xs font-bold text-[#3B3A3A] uppercase font-mono-specs">
                Key Build Highlights
              </h3>
              <div className="space-y-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3B3A3A] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Technical Data Sheet */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8DF] shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-[#F68722] uppercase font-mono-specs">ENGINEERING SPECS</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3B3A3A] font-heading mt-1">
              Technical Specifications
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <tbody>
                {product.specs.map((spec, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-[#EFE8DF] ${
                      idx % 2 === 0 ? 'bg-[#FFFBF7]/50' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-[#736F6A] w-1/3">
                      {spec.label}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#3B3A3A] font-mono-specs">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ideal Applications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8DF] shadow-sm space-y-4">
          <h3 className="text-lg font-black text-[#3B3A3A] font-heading">
            Recommended Cargo Applications
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {product.applications.map((app, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-[#F5EFE8] text-[#3B3A3A] font-bold text-xs rounded-xl border border-[#EFE8DF]"
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Related Product Range */}
        <div className="space-y-6 pt-4 border-t border-[#EFE8DF]">
          <h3 className="text-2xl font-black text-[#3B3A3A] font-heading">
            Other Product Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug}`}
                className="bg-white rounded-2xl p-4 border border-[#EFE8DF] hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#F5EFE8] mb-3">
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="text-sm font-black text-[#3B3A3A] font-heading group-hover:text-[#F68722] transition-colors">
                  {rel.name}
                </h4>
                <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#F68722]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
