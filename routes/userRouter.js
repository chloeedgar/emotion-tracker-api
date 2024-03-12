const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const userRouter = express.Router();

// Route for user sign up
userRouter.post('/signup', [
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters long')
        .isAlphanumeric().withMessage('Username can only contain letters and numbers'),
    body('firstName')
        .trim()
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long')
        .isAlpha().withMessage('First name can only contain alphabetic characters'),
    body('lastName')
        .trim()
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .isAlpha().withMessage('Last name can only contain alphabetic characters'),
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email address'),
    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.signupPost);

// Route for user sign in
userRouter.post('/signin', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], userController.signinPost);


userRouter.get('/signout', userController.signout);

module.exports = userRouter;