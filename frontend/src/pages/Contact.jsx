import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { API_URL, SITE } from "../config";

const contactInfo = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phoneTel}` },
  { icon: MapPin, label: "Location", value: SITE.address, href: null },
  { icon: Clock, label: "Hours", value: SITE.hours, href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
  { icon: Twitter, href: SITE.social.twitter, label: "Twitter" },
  { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you for your message! We'll respond within 24-48 hours.");
        setFormData({ name: "", email: "", interest: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Contact Error:", error);
      toast.error("An error occurred. Please check your connection.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent pointer-events-none"></div>
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="decoration-line mx-auto mb-6"></div>
            <h1 className="heading-xl text-gray-900 mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-body-lg mb-8 leading-relaxed">
              Have questions about our programs, want to partner with us, or 
              interested in volunteering? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">
                Send Us a <span className="text-red-500">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Your Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-14 bg-gray-50 border-gray-200 focus:border-red-500 transition-all rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-14 bg-gray-50 border-gray-200 focus:border-red-500 transition-all rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Subject / Interest
                  </label>
                  <Input
                    placeholder="How can we help?"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    required
                    className="h-14 bg-gray-50 border-gray-200 focus:border-red-500 transition-all rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-gray-50 border-gray-200 focus:border-red-500 transition-all rounded-xl p-4"
                  />
                </div>
                
                <Button type="submit" size="lg" className="btn-primary w-full sm:w-auto h-14 px-10 rounded-xl group">
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
                  Get in <span className="text-red-500">Touch</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  We're here to assist you. Reach out through any of these 
                  channels or follow us on social media to stay updated.
                </p>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {contactInfo.map((item) => {
                  const CardWrapper = item.href ? motion.a : motion.div;
                  return (
                    <CardWrapper
                      key={item.label}
                      {...(item.href ? { href: item.href } : {})}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all"
                    >
                      <div className="bg-red-50 p-3 rounded-xl mr-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        <item.icon className="h-6 w-6 text-red-500 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="font-semibold text-gray-900 break-all">{item.value}</p>
                      </div>
                    </CardWrapper>
                  );
                })}
              </div>

              {/* Social Connect */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h3 className="text-xl font-bold mb-6 relative z-10">Follow Our Progress</h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                      className="p-4 rounded-xl bg-white/10 hover:bg-red-500 border border-white/10 transition-all flex items-center justify-center"
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section with Improved Design */}
      <section className="py-20 bg-gray-50 overflow-hidden relative">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Visit Our Office</h2>
            <div className="decoration-line mx-auto"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white relative"
          >
            <iframe 
              src={SITE.googleMapsEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="eager" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
