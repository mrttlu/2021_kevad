/* eslint-disable no-console */
const logger = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  return next();
};

module.exports = logger;
