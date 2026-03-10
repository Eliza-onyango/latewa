import HeroSlideshow from '../components/HeroSlideshow';
import ImpactCard from '../components/ImpactCard';
import story1 from '../assets/DSCF4908.JPG';
import story2 from '../assets/DSCF4915.JPG';
import story3 from '../assets/DSCF4927.JPG';

function Impact() {
  const impactStats = [
    { number: '15,000+', label: 'People Empowered', description: 'Individuals benefiting from our advocacy and empowerment programs' },
    { number: '500+', label: 'Legal Cases Handled', description: 'Free legal aid and advocacy support provided' },
    { number: '100+', label: 'Communities Reached', description: 'Through our social justice and environmental programs' },
    { number: '5+', label: 'Years of Impact', description: 'Dedicated to social justice and environmental sustainability' },
    { number: '300+', label: 'Active Volunteers', description: 'Youth and community members driving change' },
    { number: '30+', label: 'Partner Organizations', description: 'Government, UN, and civil society collaborations' },
    { number: '2,000+', label: 'Trees Planted', description: 'Climate action and environmental conservation efforts' },
    { number: '25+', label: 'Policy Changes Influenced', description: 'Advocacy successes for social justice' },
  ];

  const stories = [
    {
      name: 'Hassan Ali',
      story: 'Latewa CBO provided me with free legal representation during my land dispute. Their advocacy ensured my family retained our ancestral property.',
      image: story1,
      program: 'Legal Aid',
    },
    {
      name: 'Grace Wangari',
      story: 'Through their climate action program, I learned sustainable farming techniques that doubled my crop yield while conserving water.',
      image: story2,
      program: 'Climate Action',
    },
    {
      name: 'Omar Mohamed',
      story: 'The digital access program taught me computer skills that helped me secure employment with a local NGO. Now I can support my siblings education.',
      image: story3,
      program: 'Digital Empowerment',
    },
  ];

  const milestones = [
    { year: '2019', title: 'Foundation', description: 'Latewa CBO founded with focus on social justice and community empowerment' },
    { year: '2020', title: 'First Legal Aid Clinic', description: 'Established free legal services for marginalized communities' },
    { year: '2021', title: 'Climate Action Launch', description: 'Started environmental conservation and climate resilience programs' },
    { year: '2022', title: 'Arts for Change', description: 'Launched cultural programs using art and music for social transformation' },
    { year: '2023', title: 'Digital Access Initiative', description: 'Bridged digital divide with technology training for women and youth' },
    { year: '2024', title: 'Policy Advocacy Success', description: 'Successfully advocated for local policy changes supporting community rights' },
  ];

  return (
    <div>
      <HeroSlideshow />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Impact by Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our work has touched thousands of lives across the community. Here is a snapshot of our impact.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <ImpactCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from community members whose lives have been transformed through our programs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-green-600 font-medium">{story.program}</span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2">{story.name}</h3>
                  <p className="text-gray-600 italic">"{story.story}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones in our journey of community development.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200 hidden md:block"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-lg shadow-md p-6 inline-block">
                      <span className="text-green-600 font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-lg font-semibold text-gray-800 mt-1">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow hidden md:block z-10"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Annual Reports</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We believe in transparency. Download our annual reports to see detailed information about our programs and finances.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['2023', '2022', '2021', '2020'].map((year) => (
              <button
                key={year}
                className="bg-white border border-gray-300 hover:border-green-600 hover:text-green-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Annual Report {year}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Impact;
