import jwt, { JwtPayload } from 'jsonwebtoken';

export const isJwtExpired = (token: string): boolean => {
  try {
    const decodedToken: string | JwtPayload | null = jwt.decode(token);
    if (!decodedToken) return true;

    const currentTime = Date.now() / 1000;

    // If decodedToken is of type JwtPayload, check its expiration
    if (
      typeof decodedToken !== 'string' &&
      'exp' in decodedToken &&
      decodedToken.exp
    ) {
      return decodedToken.exp < currentTime;
    }
    return true;
  } catch (error) {
    return true;
  }
};
