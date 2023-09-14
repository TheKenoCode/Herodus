import jwt from 'jsonwebtoken'

export const isJwtExpired = (token: string): boolean => {
  try {
    const decodedToken: any = jwt.decode(token)
    if (!decodedToken) return true

    const currentTime = Date.now() / 1000

    // If the expiration time is before the current time, then it's expired
    return decodedToken.exp < currentTime
  } catch (error) {
    return true
  }
}
