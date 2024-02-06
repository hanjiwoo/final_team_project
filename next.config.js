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
  },
  typescript: {
    ignoreBuildErrors: true
  }
};
// module.exports = {
//   images: {
//     domains: ["your-image-domain.com"],
//   },
// };
// module.exports = {
//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     ignoreBuildErrors: true,
//   },
// }
