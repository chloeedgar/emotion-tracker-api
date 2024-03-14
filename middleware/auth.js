
const requireAuth = (req, res, next) => {
    console.log('Checking authentication...');
    console.log('Session object:', req.session);
    const userId = req.headers.authorization; // Assuming the user ID is sent in the Authorization header

    console.log('userId:', userId);

    if (req.session && req.headers.authorization) {
        console.log('User is authenticated');
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        console.log('User is not authenticated');
        return res.status(401).json({
            status: 'failure',
            message: 'Unauthorized'
        }); // User is not authenticated, send 401 Unauthorized status
    }
};

module.exports = requireAuth;
