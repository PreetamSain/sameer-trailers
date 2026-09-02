import React from 'react';
import { motion } from 'framer-motion';

interface NoiseFillCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  footerLabel?: string;
  footerValue?: string;
  baseBg?: string;
}

export const NoiseFillCard: React.FC<NoiseFillCardProps> = ({
  icon,
  tag,
  title,
  description,
  footerLabel,
  footerValue,
  baseBg = 'bg-[#FFFBF7]'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-3xl border border-[#EFE8DF] hover:border-[#F68722]/50 p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${baseBg}`}
    >
      <div className="space-y-4">
        {/* Icon Pill with subtle hover morph */}
        <div className="w-12 h-12 rounded-2xl bg-[#F68722]/10 group-hover:bg-[#F68722] flex items-center justify-center text-[#F68722] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        {/* Typography */}
        <div>
          <span className="text-xs font-black text-[#F68722] font-mono-specs block">
            {tag}
          </span>
          <h3 className="text-base font-black text-[#3B3A3A] group-hover:text-[#1A1A1A] font-heading mt-1 leading-snug">
            {title}
          </h3>
          <p className="text-xs text-[#736F6A] mt-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Metric */}
      {footerLabel && (
        <div className="pt-4 mt-4 border-t border-[#EFE8DF] flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#736F6A] uppercase font-mono-specs block">
            {footerLabel}
          </span>
          <span className="text-xs font-black text-[#3B3A3A] block">
            {footerValue}
          </span>
        </div>
      )}
    </motion.div>
  );
};
