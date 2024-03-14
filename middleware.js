// const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;
  
//     if (!token) {
//       return res.status(401).json({ message: 'Token is missing' });
//     }
  
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
  
//       req.userId = decoded.userId;
//       next();
//     });
//   };
  
  

// module.exports = { verifyToken};

// const isAuthenticated = (req, res, next) => {
//     console.log('Session:', req.session); //debug logging
//     console.log('Session:', req.session.userId); //debug logging

//     // Check if user is authenticated
//     if (req.session && req.session.userId) {
//         // User is authenticated, proceed to the next middleware
//         next();
//     } else {
//         // User is not authenticated, send 401 Unauthorized status
//         return res.status(401).json({
//             status: 'failure',
//             message: 'Unauthorized'
//         });
//     }
// };

// const isAuthorized = (req, res, next) => {
//     // Check if user is authorized to access the resource
//     if (req.params.userId === req.session.userId) {   // Adjust this logic as per your application's requirements
//         // User is authorized, proceed to the next middleware
//         next();
//     } else {
//         // User is not authorized, send 403 Forbidden status
//         return res.status(403).json({
//             status: 'failure',
//             message: 'Forbidden'
//         });
//     }
// };

// Export middleware functions together as an object
// module.exports = { isAuthenticated, isAuthorized, verifyToken};