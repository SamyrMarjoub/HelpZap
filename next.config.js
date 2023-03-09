require('dotenv').config()
require('next-videos')

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        }
      }
    })
    return config
  }
}


module.exports = nextConfig
