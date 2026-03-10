import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function GetInvolved() {
  // Form state for Donation
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    amount: '',
    type: 'one-time',
    status: 'individual'
  });

  // Form state for Volunteer
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    skills: '',
    availability: ''
  });

  // Form state for Partner
  const [partnerForm, setPartnerForm] = useState({
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: 'ngo',
    partnershipInterest: '',
    message: ''
  });

  // Handle form submissions
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    console.log('Donation Form:', donationForm);
    // Add your form submission logic here
    alert('Thank you for your donation interest! We will contact you soon.');
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    console.log('Volunteer Form:', volunteerForm);
    // Add your form submission logic here
    alert('Thank you for volunteering! We will reach out to you shortly.');
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    console.log('Partner Form:', partnerForm);
    // Add your form submission logic here
    alert('Thank you for your partnership interest! We will contact you soon.');
  };

  // Animation variants
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="bg-white"
    >
      {/* Colored Hero Section - No Image */}
      <motion.section 
        variants={fadeInUp}
        className="bg-gradient-to-r from-red-700 to-red-600 text-white py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Get Involved</h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Join us in making a difference. Whether you want to volunteer, partner with us, 
              or make a donation, your support helps create lasting change in our communities.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <motion.section 
        variants={staggerContainer}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Every contribution matters. Find the way that works best for you to support our mission.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Three Forms Section */}
      <motion.section 
        variants={staggerContainer}
        className="pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Volunteer Form */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-red-600"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Volunteer</h3>
                </div>
              </div>
              
              <form onSubmit={handleVolunteerSubmit} className="p-6 space-y-4">
                <p className="text-gray-600 text-sm mb-4">
                  Join our youth-led movement for social justice and environmental sustainability.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={volunteerForm.phone}
                    onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area of Interest *</label>
                  <select
                    required
                    value={volunteerForm.interest}
                    onChange={(e) => setVolunteerForm({...volunteerForm, interest: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select an area</option>
                    <option value="legal">Legal Aid & Research</option>
                    <option value="climate">Climate Activism</option>
                    <option value="community">Community Organizing</option>
                    <option value="digital">Digital Advocacy</option>
                    <option value="arts">Arts & Culture</option>
                    <option value="education">Education & Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills/Experience</label>
                  <textarea
                    rows="3"
                    value={volunteerForm.skills}
                    onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="Tell us about your relevant skills and experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={volunteerForm.availability}
                    onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors transform hover:scale-105 duration-300"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>

            {/* Partner Form */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-red-600"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Partner with Us</h3>
                </div>
              </div>
              
              <form onSubmit={handlePartnerSubmit} className="p-6 space-y-4">
                <p className="text-gray-600 text-sm mb-4">
                  Collaborate with us on projects related to social justice, environmental conservation, and community empowerment.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.organization}
                    onChange={(e) => setPartnerForm({...partnerForm, organization: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="Your Organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.contactName}
                    onChange={(e) => setPartnerForm({...partnerForm, contactName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({...partnerForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="contact@organization.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({...partnerForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type *</label>
                  <select
                    required
                    value={partnerForm.organizationType}
                    onChange={(e) => setPartnerForm({...partnerForm, organizationType: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  >
                    <option value="ngo">Non-Profit/NGO</option>
                    <option value="corporate">Corporate</option>
                    <option value="educational">Educational Institution</option>
                    <option value="community">Community Group</option>
                    <option value="government">Government Agency</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Interest *</label>
                  <select
                    required
                    value={partnerForm.partnershipInterest}
                    onChange={(e) => setPartnerForm({...partnerForm, partnershipInterest: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select interest</option>
                    <option value="project">Project Collaboration</option>
                    <option value="sponsor">Sponsorship</option>
                    <option value="funding">Funding/Grant</option>
                    <option value="resources">Resource Sharing</option>
                    <option value="capacity">Capacity Building</option>
                    <option value="advocacy">Joint Advocacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message/Proposal</label>
                  <textarea
                    rows="3"
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({...partnerForm, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="Tell us more about your partnership ideas"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors transform hover:scale-105 duration-300"
                >
                  Submit Partnership Inquiry
                </button>
              </form>
            </motion.div>

            {/* Donation Form */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-red-600"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Make a Donation</h3>
                </div>
              </div>
              
              <form onSubmit={handleDonationSubmit} className="p-6 space-y-4">
                <p className="text-gray-600 text-sm mb-4">
                  Support our programs that combine law, technology, and art for social change.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={donationForm.name}
                    onChange={(e) => setDonationForm({...donationForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={donationForm.email}
                    onChange={(e) => setDonationForm({...donationForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount ($) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donation Type *</label>
                  <select
                    required
                    value={donationForm.type}
                    onChange={(e) => setDonationForm({...donationForm, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  >
                    <option value="one-time">One-time Donation</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donor Status *</label>
                  <select
                    required
                    value={donationForm.status}
                    onChange={(e) => setDonationForm({...donationForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  >
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                    <option value="foundation">Foundation</option>
                  </select>
                </div>

                {/* Suggested amounts */}
                <div className="pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Suggested Amounts:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[25, 50, 100, 250, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationForm({...donationForm, amount: amount.toString()})}
                        className="py-2 border border-gray-300 rounded-lg text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors transform hover:scale-105 duration-300 mt-4"
                >
                  Proceed to Donation
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Get Involved Section */}
      <motion.section 
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Get Involved?</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Make an Impact</h3>
              <p className="text-gray-600">Your contribution directly supports communities in need and creates lasting change.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Join a Community</h3>
              <p className="text-gray-600">Connect with like-minded individuals and organizations passionate about social change.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Drive Innovation</h3>
              <p className="text-gray-600">Be part of innovative solutions that combine law, technology, and art for social good.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        variants={fadeInUp}
        className="py-16 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We're here to help you find the best way to get involved.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default GetInvolved;