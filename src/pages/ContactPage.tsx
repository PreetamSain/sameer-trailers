import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle2, FileText } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_LIST } from '../data/trailers';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState('Heavy-Duty Commercial Tippers');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-[#EFE8DF] pb-6 space-y-2">
          <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#3B3A3A] font-heading">
            Contact Sameer Trailers
          </h1>
          <p className="text-xs sm:text-sm text-[#736F6A] max-w-xl">
            Reach out to our plant sales and engineering team in Bhilwara, Rajasthan for quotations, fleet orders, or custom build discussions.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE8DF] shadow-sm space-y-5">
              <h3 className="text-xs font-bold text-[#3B3A3A] uppercase font-mono-specs">
                Direct Communication
              </h3>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-4 p-4 bg-[#FFFBF7] hover:bg-[#F5EFE8] rounded-2xl border border-[#EFE8DF] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F68722]/10 flex items-center justify-center text-[#F68722] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#736F6A] font-bold uppercase block">Call Plant Sales</span>
                  <span className="text-sm font-bold text-[#3B3A3A] font-mono-specs">{COMPANY_INFO.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-4 p-4 bg-[#FFFBF7] hover:bg-[#F5EFE8] rounded-2xl border border-[#EFE8DF] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#3B3A3A]/10 flex items-center justify-center text-[#3B3A3A] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#736F6A] font-bold uppercase block">Email Orders</span>
                  <span className="text-sm font-bold text-[#3B3A3A] truncate block font-mono-specs">{COMPANY_INFO.email}</span>
                </div>
              </a>
            </div>

            {/* Plant Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE8DF] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#736F6A] uppercase font-mono-specs">
                <MapPin className="w-4 h-4 text-[#F68722]" />
                <span>Manufacturing Plant Location</span>
              </div>
              <p className="text-xs text-[#3B3A3A] leading-relaxed font-medium">
                {COMPANY_INFO.address}
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs text-[#736F6A]">
                <Clock className="w-4 h-4 text-[#F68722]" />
                <span>Mon - Sat: 9:00 AM to 8:00 PM</span>
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EFE8DF] shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-black text-[#3B3A3A] font-heading">
                Request a Formal Factory Quotation
              </h2>
              <p className="text-xs text-[#736F6A] mt-1">
                Fill in your contact details below and our engineering team will get back to you with detailed commercial and delivery terms.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">Quotation Request Submitted</h3>
                <p className="text-xs text-emerald-800">
                  Thank you, {name || 'valued customer'}. Our sales engineering department has received your request and will contact you at {phone} within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 py-2.5 px-5 bg-[#3B3A3A] text-white text-xs font-bold uppercase rounded-xl"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#3B3A3A] block mb-1">Full Name / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Logistics Pvt Ltd"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-[#FFFBF7] border border-[#EFE8DF] rounded-xl text-xs text-[#3B3A3A] focus:outline-none focus:border-[#F68722]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#3B3A3A] block mb-1">Mobile Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98200 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-[#FFFBF7] border border-[#EFE8DF] rounded-xl text-xs text-[#3B3A3A] focus:outline-none focus:border-[#F68722]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B3A3A] block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@transport.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#FFFBF7] border border-[#EFE8DF] rounded-xl text-xs text-[#3B3A3A] focus:outline-none focus:border-[#F68722]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B3A3A] block mb-1">Product Category of Interest</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full p-3 bg-[#FFFBF7] border border-[#EFE8DF] rounded-xl text-xs text-[#3B3A3A] focus:outline-none focus:border-[#F68722]"
                  >
                    {PRODUCTS_LIST.map((prod) => (
                      <option key={prod.id} value={prod.name}>{prod.name}</option>
                    ))}
                    <option value="Custom Body / Special Project Trailer">Custom Body / Special Project Trailer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B3A3A] block mb-1">Payload Requirements / Technical Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Specify target payload tonnage, axle requirements (2-axle / 3-axle), cargo type, or target delivery location..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-[#FFFBF7] border border-[#EFE8DF] rounded-xl text-xs text-[#3B3A3A] focus:outline-none focus:border-[#F68722]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#F68722] hover:bg-[#e07414] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#F68722]/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quotation Request</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
