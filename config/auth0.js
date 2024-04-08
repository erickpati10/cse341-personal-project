const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };
  
  module.exports = config;
  

  // const config = {
  //   authRequired: false,
  //   auth0Logout: true,
  //   secret: process.env.SESSION_SECRET,
  //   baseURL: process.env.BASE_URL,
  //   clientID: process.env.AUTH0_CLIENT_ID,
  //   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  // };
