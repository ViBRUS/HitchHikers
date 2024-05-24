const User = require('../models/userData');
const { sendError, createRandomBytes } = require("../utilities/helper");
const ResetToken = require("../models/resetToken");
const jwt = require("jsonwebtoken");
const { sendResetEmail, generatePasswordResetTemplate } = require("../utilities/mail");
const bcrypt = require('bcrypt');
const { invalidateToken } = require('../middlewares/auth');
require('dotenv').config();

class UserDataController {
    async createUser(req, res) {
        const { name, email, password, mobile } = req.body;
        const isNewUser = await User.isThisEmailInUse(email);
        if (!isNewUser) {
            console.log("User creation failed: Email already in use");
            return res.json({
                success: false,
                message: "This email is already in use, try sign-in",
            });
        }
        const user = new User({ name, email, password, mobile });
        await user.save();
        console.log("User created successfully:", user.email);
        res.json({
            success: true,
            user: { name: user.name, email: user.email, mobile: user.mobile, id: user._id },
        });
    }

    async signIn(req, res) {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim()) {
            console.log("Sign-in failed: Email or password missing");
            return sendError(res, "email/password missing!");
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Sign-in failed: User not found");
            return sendError(res, "User not found");
        }
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            console.log("Sign-in failed: Email/password does not match");
            return sendError(res, "email/password does not match!");
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("User signed in successfully:", user.email);
        res.json({
            success: true,
            user: { name: user.name, email: user.email, id: user._id, token: token },
        });
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
        if (!email) {
            console.log("Forgot password failed: Email not provided");
            return sendError(res, "Please provide a valid email");
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Forgot password failed: User not found");
            return sendError(res, "User not found, invalid request!");
        }

        const token = await ResetToken.findOne({ owner: user._id });
        if (token) {
            console.log("Forgot password failed: Token already exists for user");
            return sendError(res, "Only after one hour you can request for another token!");
        }

        const newToken = await createRandomBytes();
        const resetToken = new ResetToken({ owner: user._id, token: newToken });
        await resetToken.save();

        const baseUrl = process.env.BACKEND

        const url = `${baseUrl}/api/user/resetPassword?token=${newToken}&id=${user._id}`;
        const emailBody = await generatePasswordResetTemplate(url);
        await sendResetEmail(emailBody, user.email);
        console.log("Password reset link sent successfully to:", user.email);

        res.json({
            success: true,
            message: "Password reset link is sent to your email.",
        });
    }

    async resetPassword(req, res) {
        const { token, id } = req?.query;
        const { newPassword } = req.body;
        if (!token || !id || !newPassword) {
            console.log("Reset password failed: Missing required parameters");
            return sendError(res, 'Missing required parameters');
        }

        const resetToken = await ResetToken.findOne({ owner: id });
        if (!resetToken) {
            console.log("Reset password failed: Invalid or expired reset token");
            return sendError(res, 'Invalid or expired reset token');
        }

        const isValid = await bcrypt.compare(token, resetToken.token);
        if (!isValid) {
            console.log("Reset password failed: Invalid or expired reset token");
            return sendError(res, 'Invalid or expired reset token');
        }

        const user = await User.findById(id);
        if (!user) {
            console.log("Reset password failed: User not found");
            return sendError(res, 'User not found');
        }

        user.password = newPassword;
        await user.save();

        await ResetToken.findByIdAndDelete(resetToken._id);

        console.log("Password reset successfully for user:", user.email);
        res.json({ success: true, message: 'Password reset successfully' });
    }

    async signOut(req, res) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (token) {
            invalidateToken(token);
            console.log("User signed out successfully");
            res.json({ success: true, message: 'Signed out successfully' });
        } else {
            console.log("Sign-out failed: No token provided");
            res.status(400).json({ success: false, message: 'No token provided' });
        }
    }
}

module.exports = UserDataController;
