const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        return res.status(401).json({
            status: 'failure',
            message: 'Unauthorized'
        }); // User is not authenticated, send 401 Unauthorized status
    }
};

  module.exports = requireAuth;
