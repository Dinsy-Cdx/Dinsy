/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tiendasishop.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.notebookgalerie.de',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img10.naventcdn.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
    // output: 'export',
};



export default nextConfig;
