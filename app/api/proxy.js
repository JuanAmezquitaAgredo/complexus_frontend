import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
    target: 'https://complexusproject-production-e80b.up.railway.app',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Quita "/api" del inicio de la ruta
    },
});
