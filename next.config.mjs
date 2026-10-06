/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/:path*", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ]},
    ];
  },
  // The static site shipped .html URLs that are indexed. Keep them working.
  async redirects() {
    return [
      { source: "/index.html",   destination: "/",         permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/about.html",    destination: "/about",    permanent: true },
      { source: "/contact.html",  destination: "/contact",  permanent: true },
      { source: "/legal/privacy.html", destination: "/legal/privacy", permanent: true },
      { source: "/legal/terms.html",   destination: "/legal/terms",   permanent: true },
    ];
  },
};
export default nextConfig;
