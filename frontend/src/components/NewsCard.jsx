import { Link } from 'react-router-dom';

function NewsCard({ title, excerpt, date, image, slug }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto">
        <img
          src={image || '/placeholder-images/gallery-1.jpg'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="p-8 md:w-2/3 flex flex-col justify-center">
        <div className="flex items-center text-brand-red font-bold text-xs uppercase tracking-widest mb-3">
          <span className="w-8 h-px bg-brand-red mr-3"></span>
          {formattedDate}
        </div>
        <h3 className="text-2xl font-bold text-brand-black mb-4 group-hover:text-brand-red transition-colors">{title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{excerpt}</p>
        <Link
          to={slug ? `/news/${slug}` : '/news'}
          className="text-brand-black font-bold flex items-center group/link hover:text-brand-red transition-colors"
        >
          Read Article
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
      </div>
    </article>
  );
}

export default NewsCard;
