/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                // Cambia '/api/auth' a la ruta que quieras utilizar en tu aplicación
                source: '/api/:path*',
                destination: 'https://complexusproject-production-e80b.up.railway.app/:path*', // La URL de tu API
            },
        ];
    },
};

export default nextConfig;
