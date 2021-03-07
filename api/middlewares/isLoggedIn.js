const { jwtService } = require('../services');

const isLoggedIn = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      error: 'No authorization header',
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  const payload = await jwtService.verify(token);
  if (!payload) {
    return res.status(403).json({
      error: 'Unauthorized',
    });
  }
  req.userId = payload.id;
  req.userRole = payload.role;
  return next();
};

module.exports = isLoggedIn;
