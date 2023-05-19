import jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces/user';
import logging from '../config/logging';
import config from '../config/config';

const NAMESPACE = 'Auth';

// Function to generate tokens
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.server.token.secret, {
    expiresIn: config.server.token.expireTime,
  });
};

export const signJWT = (
  user: ILogin,
  callback: (error: Error | null | unknown, token: string | null) => void
): void => {
  const timeSinceEpoch = Date.now();
  const expirationTime =
    timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  logging.info(NAMESPACE, `Attempting to sign token for ${user.email}`);

  try {
    jwt.sign(
      {
        userId: user.id,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    logging.error(NAMESPACE, 'error signing jwt', error);
    callback(error, null);
  }
};
