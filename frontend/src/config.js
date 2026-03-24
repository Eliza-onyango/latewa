export const API_URL = 'http://localhost:5000/api';

export const getImageUrl = (path) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}${path}`;
  }
  return path;
};
