require('dotenv').config()
require('next-videos')

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
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
    DB_LIVE:process.env.DB_LIVE,
    SERVICE_KEY:process.env.SERVICE_KEY
  },
  typescript:{
    ignoreBuildErrors:true
  }
}


module.exports = nextConfig
