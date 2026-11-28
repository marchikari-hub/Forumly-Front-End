/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), ({ request }, cb) =>
        request === "node:sqlite" ? cb(null, "commonjs node:sqlite") : cb()];
    }
    return config;
  },
};

export default nextConfig;