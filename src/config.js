const getVideoBucket = (isProduction) => {
  if (isProduction) { return 'https://dzm8p9d24aw36.cloudfront.net' }
  else              { return 'https://doxvmry0pd5ic.cloudfront.net' }
}

export const config = {
  IsTesting: false,
  VideoBucket: getVideoBucket(false),
}
