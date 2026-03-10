import { Link } from 'react-router-dom';

function ProgramCard({ title, description, image, link }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden h-56">
        <img
          src={image || '/placeholder-images/program-1.jpg'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          Program
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{description}</p>
        {link && (
          <Link
            to={link}
            className="text-brand-red font-bold inline-flex items-center group/link"
          >
            Learn More
            <svg
              className="w-5 h-5 ml-2 transition-transform group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProgramCard;
