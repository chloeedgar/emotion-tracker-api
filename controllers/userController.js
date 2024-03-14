const bcrypt = require('bcrypt');
const conn = require('../utils/dbConn');
const { validationResult } = require('express-validator');


// Function to handle user sign up
exports.signupPost = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    console.log(errors);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { username, firstName, lastName, email, password } = req.body;

    // Hash the password before storing it in the database
    //for security, user privacy and protection against data breaches
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Check if the username already exists in the database
    const checkUserSQL = `SELECT * FROM user WHERE username = ?`;

    conn.query(checkUserSQL, [username], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                status: 'failure',
                message: 'Internal Server Error'
            });
        } else {
            if (rows.length > 0) {
                console.log('Username ' + username + ' already exists');
                return res.status(400).json({
                    status: 'failure',
                    message: 'Username already exists'
                });
            } else {
                // Insert the new user into the database
                const insertUserSQL = `INSERT INTO user (username, first_name, last_name, email_address, password) VALUES (?, ?, ?, ?, ?)`;
                const values = [username, firstName, lastName, email, hashedPassword];
                conn.query(insertUserSQL, values, (err, result) => {
                    if (err) {
                        console.log('Error when inserting user: ' + e);
                        return res.status(500).json({
                            status: 'failure',
                            message: 'Internal Server Error'
                        });
                    } else {
                        return res.status(200).json({
                            status: 'success',
                            message: 'User created successfully',
                            userId: result.insertId
                        });
                    }
                });
            }
        }
    });
};

// Function to handle user sign in
exports.signinPost = (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Query database to find user with provided username
    const checkUserSQL = `SELECT * FROM user WHERE username = ?`;
    conn.query(checkUserSQL, [username], (err, rows) => {
        if (err) {
            console.log("Internal Server Error");
            return res.status(500).json({
                status: 'failure',
                message: 'Internal Server Error'
            });
        } else {
            if (rows.length === 0) {
                console.log("Invalid username or password");
                return res.status(401).json({
                    status: 'failure',
                    message: 'Invalid username or password'
                });
            } else {
                // Compare provided password with hashed password stored in database
                console.log("Username exists, checking password");
                bcrypt.compare(password, rows[0].password, (err, passwordMatch) => {
                    if (err) {
                        console.error("Internal Server Error when comparing password to hashed password");
                        return res.status(500).json({
                            status: 'failure',
                            message: 'Internal Server Error'
                        });
                    } else {
                        if (passwordMatch) {
                            // User authenticated successfully
                            console.log('User: ' + username + ' logged in successfully');
                            const userId = rows[0].user_id; // Replace with actual user ID


                            return res.status(200).json({
                                status: 'success',
                                message: 'User logged in successfully',
                                userId: rows[0].user_id
                            });
                        } else {
                            return res.status(401).json({
                                status: 'failure',
                                message: 'Invalid username or password'
                            });
                        }
                    }
                });
            }
        }
    });
};

// Function to handle user sign out
exports.signout = (req, res) => {
    // Destroy the user's session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({
                status: 'failure',
                message: 'Internal Server Error'
            });
        }
        res.clearCookie('session'); // Clear session cookie

        res.status(200).json({
            status: 'success',
            message: 'User signed out successfully'
        });
    });
};


