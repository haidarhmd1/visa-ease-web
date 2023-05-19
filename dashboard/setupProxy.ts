import { RequestHandler, createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: {
  use: (arg0: string, arg1: RequestHandler) => void;
}) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
};
