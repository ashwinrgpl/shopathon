import asyncHandler from '../middleware/asyncHandler.js';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    Auth and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        // Set JWT as HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,   
            email: user.email,
            token: token,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register user');
});

// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.send('Logout user');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Get user profile');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('Update user profile');
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('Get all users');
});

// @desc  Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Delete user');
});

// @desc  Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('Get user by id');
});

// @desc  Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('Update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};