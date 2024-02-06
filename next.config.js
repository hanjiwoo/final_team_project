/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
/** @type {import('tailwindcss').Config} */

module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com", "your-image-domain.com"]
  },
  experimental: {
    reactRoot: true
  }
};
// module.exports = {
//   images: {
//     domains: ["your-image-domain.com"],
//   },
// };
