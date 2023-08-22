export function getApiUrl() {
  const MODE = process.env.MODE

  if (MODE === 'production') {
    return 'https://herodus.vercel.app'
  } else if (MODE === 'development') {
    return 'http://localhost:3000'
  } else {
    throw new Error('Invalid MODE environment variable.')
  }
}
