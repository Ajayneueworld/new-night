/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    env : {
    MONGO_URI : "mongodb+srv://Aduttya:Aduttya%40786@cluster0.esdgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  },
  async rewrites() {
    return [
      {
        source: '/trending',
        destination: '/',
      },
    ]
  }
}

module.exports = nextConfig
