const getVideoBucket = (isProduction) => {
  if (isProduction) {
    return 'https://s3.amazonaws.com/krad-tv-production-video'
  } else {
    return 'https://s3.amazonaws.com/krad-tv-staging-video'
  }
}

export const config = {
  IsTesting: true,
  VideoBucket: getVideoBucket(false),
}
