const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config({ path: './config.env' });
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const snapshotRouter = require('./routes/snapshotRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, '/public')));  // Serve static files from the 'public' directory
app.use(morgan('tiny'));  // Log requests with Morgan
app.use(express.urlencoded({ extended: true }));  //Parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON-formatted request bodies

// Add session middleware before defining routes
app.use(session({
    secret: 'secret-key', 
    resave: false,  
    saveUninitialized: true, // true or false?
    cookie: {
        secure: false, // not using HTTPS
        httpOnly: true,  // best practise=true as prevents cross-site scripting (XSS) attacks
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//Routes
app.use('/api/users', userRouter); //User routes
app.use('/api/snapshots', snapshotRouter); //Snapshot routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);

    console.log(`Express listening on port ${process.env.PORT}`);
});