function ImpactCard({ number, label, description, icon }) {
  return (
    <div className="bg-brand-black/40 backdrop-blur-sm border border-brand-red/20 rounded-2xl p-8 text-center hover:bg-brand-black/60 transition-all duration-300 group">
      {icon && (
        <div className="text-brand-red mb-6 flex justify-center transform group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
      <div className="text-5xl font-black text-brand-red mb-3 tracking-tight">{number}</div>
      <div className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{label}</div>
      {description && (
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
}

export default ImpactCard;
