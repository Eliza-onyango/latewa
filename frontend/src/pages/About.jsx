import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import aboutHero from '../assets/_DSF3707.JPG';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function About() {
  const teamMembers = [
    {
      name: 'Benedict Oduor',
      role: 'Executive Director',
      bio: 'Advocate of the High Court of Kenya and Co-Founder of Latewa Arts CBO, Benedict is passionate about community development, environmental justice, and access to justice. He leads initiatives that empower youth through legal advocacy, skills development, and sustainable community-driven solutions.'
    },
    {
      name: 'Dr. James Omondi',
      role: 'Program Manager',
      bio: 'Environmental scientist and climate action expert dedicated to sustainable development and environmental conservation.'
    },
    {
      name: 'Aisha Hassan',
      role: 'Legal Aid Coordinator',
      bio: 'Human rights lawyer committed to providing legal assistance and advocating for justice in marginalized communities.'
    },
    {
      name: 'David Kibet',
      role: 'Arts & Culture Lead',
      bio: 'Artist and cultural activist using creative expression to drive social change and community empowerment.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Organization Founded', description: 'Latewa International NGO was established with a mission to empower communities.' },
    { year: '2019', title: 'First Legal Aid Program', description: 'Launched our first legal aid initiative serving 500+ community members.' },
    { year: '2020', title: 'Climate Action Initiative', description: 'Started environmental conservation programs in rural communities.' },
    { year: '2021', title: 'Arts for Change', description: 'Introduced arts and culture programs for youth empowerment.' },
    { year: '2022', title: 'National Recognition', description: 'Received national award for outstanding community service.' },
    { year: '2023', title: 'International Partnerships', description: 'Established partnerships with international organizations.' }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="bg-white"
    >
      {/* Hero Section */}
      <motion.section
        variants={staggerContainer}
        className="section relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="w-20 h-1 bg-red-600 mb-6"></div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-red-600">Latewa International</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are a youth-led community organization committed to social justice, 
                climate action, environmental conservation, legal aid, arts, and community empowerment. 
                Our mission is to create lasting change through innovative approaches and community-driven solutions.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-red-600">
                  <div className="text-3xl font-black text-red-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Active Projects</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-red-600">
                  <div className="text-3xl font-black text-red-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Communities Served</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutHero}
                  alt="Our Team"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-red-600">Mission & Vision</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guided by our core values, we work tirelessly to create a more just, 
              sustainable, and empowered society.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-b-4 border-red-600">
              <div className="w-16 h-16 bg-red-600/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower communities through comprehensive programs that advance social justice, 
                promote environmental sustainability, provide legal aid, and foster artistic expression. 
                We believe in the power of collective action and community-driven solutions to create 
                lasting change.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-b-4 border-red-600">
              <div className="w-16 h-16 bg-red-600/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where every community has the tools, knowledge, and support needed 
                to thrive. We envision a society where justice is accessible to all, 
                the environment is protected and respected, and creative expression 
                serves as a powerful tool for transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Journey - Card Grid Style */}
      <motion.section
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-red-600">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to a growing force for change, our journey reflects 
              the dedication and passion of our team and supporters.
            </p>
          </motion.div>

          {/* Card Grid Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 relative overflow-hidden">
                  {/* Year badge */}
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-bl-xl font-bold">
                    {milestone.year}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 pr-16">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                  
                  {/* Progress indicator */}
                  <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Journey stats */}
          <motion.div 
            variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '6', label: 'Years of Impact' },
                { number: '25+', label: 'Projects Completed' },
                { number: '10k+', label: 'Lives Changed' },
                { number: '3', label: 'Countries' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-red-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Team - Simplified with person icons */}
      <motion.section
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-red-600">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of professionals brings diverse expertise and 
              unwavering commitment to our mission.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                {/* Small person icon */}
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-red-600 font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                
                {/* Simple divider */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-center space-x-3">
                    <span className="text-xs text-gray-400">●</span>
                    <span className="text-xs text-gray-400">●</span>
                    <span className="text-xs text-gray-400">●</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Join Our Mission - Split Layout */}
      <motion.section
        variants={fadeInUp}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div variants={fadeInUp}>
              <div className="w-20 h-1 bg-red-600 mb-8"></div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Join Our <span className="text-red-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Be part of the change. Whether through volunteering, donations, or spreading awareness, 
                your support helps us create a better future for communities in need.
              </p>

              {/* Features list */}
              <div className="space-y-4 mb-8">
                {[
                  'Make a direct impact in communities',
                  'Join a network of passionate changemakers',
                  'Receive regular updates on our progress',
                  'Tax-deductible donations'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/get-involved"
                  className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-all text-center"
                >
                  Get Involved
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 px-8 py-3 rounded-lg font-semibold transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right side - Impact cards */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Active Volunteers</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
                <div className="text-sm text-gray-600">Partner NGOs</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">10k+</div>
                <div className="text-sm text-gray-600">Beneficiaries</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              
              {/* Testimonial mini card */}
              <div className="col-span-2 bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-xl text-white mt-4">
                <p className="text-sm italic mb-3">
                  "The support from this organization has transformed our community. Join them in making a difference."
                </p>
                <p className="text-xs font-semibold">— Community Partner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default About;