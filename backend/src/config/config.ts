const SERVER_PORT = process.env.PORT || 3000;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'visa-ease';
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  '80476c317da57a8e86f590bcab09f147abc91bc94553284e6d847ed0963a7c621d0a7b6615b5729db2f8ef4c9cc9ef8b6353f05bb95e7da48dd4ec83a25814ad';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  '7135d0219860bb859dfb9ebbf1df6b3d2b20a59622108f7f0936f7291adbde11c12a3923aa7033cbc772e9744372fb74582ebf426ab084f6d574507dcc3edad8';

const SENDGRID_EMAIL_API_KEY =
  process.env.SENDGRID_API_KEY ||
  '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';

const SERVER = {
  SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: ACCESS_TOKEN_SECRET,
    refresh: REFRESH_TOKEN_SECRET,
  },
};

const config = {
  server: SERVER,
  sendgridApiKey: SENDGRID_EMAIL_API_KEY,
};

export default config;
