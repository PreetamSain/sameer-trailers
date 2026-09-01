import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_LIST } from '../data/trailers';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3B3A3A] text-white pt-16 pb-12 border-t border-[#4E4C4C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/">
              <img
                src={COMPANY_INFO.logo}
                alt="Sameer Trailers"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              We manufacture high-performance commercial trailers, tippers, and bulk tankers designed to handle the toughest loads, harshest terrains, and longest hauls across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#F68722]" />
              <span>ARAI AIS-113 & CMVR Certified Manufacturer</span>
            </div>
          </div>

          {/* Products List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4 font-mono-specs">
              Product Lines
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {PRODUCTS_LIST.map((prod) => (
                <li key={prod.id}>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="hover:text-[#F68722] transition-colors"
                  >
                    {prod.categoryTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4 font-mono-specs">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/" className="hover:text-[#F68722] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#F68722] transition-colors">Commercial Fleet</Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-[#F68722] transition-colors">Plant & Engineering</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F68722] transition-colors">Request Quotation</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4 font-mono-specs">
              Factory & Sales
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 hover:text-[#F68722] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F68722] shrink-0" />
                <span className="font-mono-specs font-bold">{COMPANY_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-[#F68722] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F68722] shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 text-white/60 text-[11px] pt-1">
                <MapPin className="w-4 h-4 text-[#F68722] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Sameer Trailers. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about-us" className="hover:text-white transition-colors">Engineering</Link>
            <span>•</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
