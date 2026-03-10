import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import program1 from '../assets/images (2).jpg';
import program2 from '../assets/Latewa-2.jpg';
import program3 from '../assets/Latewa-6.jpg';
import news1 from '../assets/Latewa-13.jpg';
import news2 from '../assets/Latewa-19.jpg';
import teamImg from '../assets/latewa1.jpg';
import program4 from '../assets/latewa2.jpg';

function Programs() {
  const programs = [
    {
      title: 'Social Justice & Legal Aid',
      description: 'Our legal aid program provides free legal services, advocates for human rights, and promotes access to justice for marginalized communities. We conduct legal awareness campaigns and support vulnerable populations.',
      image: program1,
      details: [
        'Free legal consultations and representation',
        'Human rights advocacy',
        'Legal literacy workshops',
        'Support for gender-based violence survivors',
      ],
    },
    {
      title: 'Climate Action & Environmental Conservation',
      description: 'We implement climate resilience projects, environmental education, and conservation initiatives. Our programs focus on sustainable practices and community engagement in environmental protection.',
      image: program2,
      details: [
        'Community-based conservation projects',
        'Climate change education',
        'Tree planting and forest restoration',
        'Sustainable agriculture training',
      ],
    },
    {
      title: 'Waste Management & Urban Farming',
      description: 'Our environmental initiatives include waste management solutions, recycling programs, and urban farming projects that promote sustainable living and food security.',
      image: program3,
      details: [
        'Community waste collection systems',
        'Recycling and upcycling workshops',
        'Urban garden establishment',
        'Composting training programs',
      ],
    },
    {
      title: 'WASH (Water, Sanitation & Hygiene)',
      description: 'We work to improve access to clean water, sanitation facilities, and hygiene education in underserved communities, promoting health and wellbeing.',
      image: news1,
      details: [
        'Borehole drilling and maintenance',
        'Sanitation facility construction',
        'Hygiene education campaigns',
        'Water quality testing',
      ],
    },
    {
      title: 'Women & Youth Digital Access',
      description: 'Our digital inclusion program provides technology training, internet access, and digital literacy programs to women and youth, bridging the digital divide.',
      image: news2,
      details: [
        'Computer literacy training',
        'Digital skills workshops',
        'Internet access points',
        'Online entrepreneurship training',
      ],
    },
    {
      title: 'Art, Music & Culture for Social Change',
      description: 'We harness the power of arts and culture to drive social transformation, promote cultural heritage, and engage communities in meaningful dialogue.',
      image: teamImg,
      details: [
        'Community theater productions',
        'Music festivals for social causes',
        'Cultural preservation projects',
        'Art therapy workshops',
      ],
    },
    {
      title: 'Entrepreneurship & Financial Literacy',
      description: 'Our economic empowerment program provides business training, financial literacy education, and support for women and youth entrepreneurs.',
      image: program1,
      details: [
        'Business development training',
        'Financial planning workshops',
        'Microfinance support',
        'Cooperative formation',
      ],
    },
  ];

  // Custom Hero component replacement with colored background
  const ColoredHero = () => (
    <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
        <p className="text-xl text-red-100 max-w-3xl mx-auto">
          Discover the various initiatives we run to empower our community and create lasting change.
        </p>
        <div className="w-24 h-1 bg-white mx-auto mt-8"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <ColoredHero />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Our comprehensive programs address critical issues of social justice, environmental sustainability, 
              and community empowerment. Each initiative is designed with community input and focuses on creating 
              sustainable, long-term impact.
            </p>
          </div>

          <div className="space-y-24">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative`}
              >
                {/* Decorative element */}
                {index < programs.length - 1 && (
                  <div className="absolute bottom--12 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gray-200 hidden lg:block"></div>
                )}
                
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} group`}>
                  <div className="relative overflow-hidden rounded-lg shadow-xl">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">
                    {program.title}
                    <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600"></span>
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">{program.description}</p>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Key Initiatives:</h4>
                    <ul className="space-y-3">
                      {program.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <svg
                            className="w-6 h-6 text-red-600 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Support Our Programs</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Your support enables us to continue and expand these vital programs. 
            Consider volunteering your time or making a donation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Involved
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Programs;