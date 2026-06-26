export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const SITE = {
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@latewacbo.org',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+254 700 000 000',
  phoneTel: import.meta.env.VITE_CONTACT_PHONE_TEL || '+254700000000',
  address:
    import.meta.env.VITE_CONTACT_ADDRESS ||
    '7th-8th Floors, Purple Tower, Shimo La Tewa Rd (Off Mombasa Rd), Nairobi',
  addressShort:
    import.meta.env.VITE_CONTACT_ADDRESS_SHORT ||
    '7th-8th Floors, Purple Tower, Nairobi',
  hours: import.meta.env.VITE_CONTACT_HOURS || 'Mon-Fri: 9AM - 5PM EAT',
  googleMapsEmbedUrl:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.790518525000!2d36.8322!3d-1.2985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f111000000000%3A0x1111111111111111!2sPurple%20Tower!5e0!3m2!1sen!2ske!4v1710750000000!5m2!1sen!2ske&q=Purple+Tower+Shimo+La+Tewa+Road+Nairobi',
  social: {
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || '#',
    twitter: import.meta.env.VITE_SOCIAL_TWITTER || '#',
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || '#',
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || '#',
  },
};

export const getImageUrl = (path) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}${path}`;
  }
  return path;
};
