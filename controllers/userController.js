const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conn = require('../utils/dbConn');
const { validationResult } = require('express-validator');

// Function to generate token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Function to handle user sign up
exports.signupPost = (req, res) => {
    console.log("request body" + req.body); // Log the request body

    // Check for validation errors
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { username, firstName, lastName, email, password } = req.body;

    // Hash the password before storing it in the database
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
                console.log('Username '  + username + ' already exists');
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
                        //const token = generateToken(result.insertId); // Generate token
                        return res.status(200).json({
                            status: 'success',
                            message: 'User created successfully',
                            //token,
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
    console.log(req.body);  //remove this
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

                                                    // User authenticated successfully
                        const token = generateToken(rows[0].user_id); // Generate token
                        console.log('token: ' + token); //debug
                        return res.status(200).json({
                            status: 'success',
                            message: 'User logged in successfully',
                            token, // Send token to client
                            userId: rows[0].user_id
                        });         

                            // // If the user is authenticated successfully, create a session
                            // req.session.userId = rows[0].user_id; 
                            // req.session.username = username;
                            // //req.session.role = role;
                            // console.log('Session created for ' + rows[0].user_id + ': ' +username);



                            // return res.status(200).json({
                            //     status: 'success',
                            //     message: 'User logged in successfully',
                            //     userId: rows[0].user_id
                            // });
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

// Function to handle user sign out   //maybe remove this
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