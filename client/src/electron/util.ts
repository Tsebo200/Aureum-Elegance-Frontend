export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
  //when in development using devScript the function will be true 
  // but when in production mode the devScript function will be false and will not run
}