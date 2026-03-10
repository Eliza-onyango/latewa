import HeroSlideshow from '../components/HeroSlideshow';
import NewsCard from '../components/NewsCard';
import news1 from '../assets/_DSF3928.JPG';
import news2 from '../assets/_DSF4748.jpg';
import program1 from '../assets/_DSF4749.jpg';
import program2 from '../assets/Latewa-2.jpg';

function News() {
  const news = [
    { title: 'Climate Action Workshop', excerpt: 'We recently hosted a workshop on climate resilience and environmental conservation for local farmers.', date: '2026-01-10', image: news1 },
    { title: 'Legal Aid Campaign Update', excerpt: 'Our ongoing legal aid campaign has provided assistance to over 300 community members this quarter.', date: '2026-01-05', image: news2 },
    { title: 'Community Theater Performance', excerpt: 'Our art and culture program organized a powerful performance addressing social justice issues.', date: '2025-12-20', image: program1 },
    { title: 'Digital Skills Training Completed', excerpt: 'Over 50 women and youth completed our digital access and skills training program.', date: '2025-12-15', image: program2 },
  ];
  return (
    <div>
      <HeroSlideshow />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((n, i) => <NewsCard key={i} {...n} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
export default News;
