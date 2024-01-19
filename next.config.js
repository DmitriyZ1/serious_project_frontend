/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            //hostname: '45.12.239.38',
        },
        ],
    }    
}

module.exports = nextConfig
