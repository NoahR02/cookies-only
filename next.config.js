/** @type {import('next').NextConfig} */

const nextConfig = {
    // Export mode breaks links on dev, so only turn on export mode when we are on prod.
    output: process.env.NODE_ENV === 'development' ? 'standalone' : 'export',
    images: {
        formats: ['image/webp'],
    },
}

module.exports = nextConfig
