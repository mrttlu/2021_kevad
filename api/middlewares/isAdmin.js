const isAdmin = (req, res, next) => {
  if (req.userRole === 'Admin') {
    next();
  } else {
    res.status(403).json({
      error: 'You have to be admin',
    });
  }
};

module.exports = isAdmin;
