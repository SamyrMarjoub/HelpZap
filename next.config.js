module.exports = {
  webpack5: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  webpack: (config) => {
      config.resolve.fallback = { fs: false };

      return config;
  },
  typescript: {
      //         // !! WARN !!
      //         // Dangerously allow production builds to successfully complete even if
      //         // your project has type errors.
      //         // !! WARN !!
      ignoreBuildErrors: true,
  },
};
// module.exports = {
//     typescript: {
//         // !! WARN !!
//         // Dangerously allow production builds to successfully complete even if
//         // your project has type errors.
//         // !! WARN !!
//         ignoreBuildErrors: true,
//     },
// }
