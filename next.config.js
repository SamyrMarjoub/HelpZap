module.exports = {
  webpack5: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    SECOND_BASE_URL: process.env.SECOND_BASE_URL,
    DB_HOST: process.env.DB_HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    AUTH: process.env.AUTH,
    LIVE_HELP_DB:process.env.LIVE_HELP_DB,
    USER_LIVE:process.env.USER_LIVE,
    PASSWORD_LIVE:process.env.PASSWORD_LIVE,
    DB_LIVE:process.env.DB_LIVE
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
