const User = require('../models/userData');
const { sendError, createRandomBytes } = require("../utilities/helper");
const ResetToken = require("../models/resetToken");
const jwt = require("jsonwebtoken");
const { sendResetEmail, generatePasswordResetTemplate } = require("../utilities/mail");
const bcrypt = require('bcrypt');
require('dotenv').config();



class UserDataController {
  async createUser(req, res) {
    const { name, email, password, mobile } = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser) {
      return res.json({
        success: false,
        message: "This email is already in use, try sign-in",
      });
    }
    const user = new User({ name, email, password, mobile });
    await user.save();
    res.json({
      success: true,
      user: { name: user.name, email: user.email, mobile: user.mobile, id: user._id },
    });
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) return sendError(res, "email/password missing!");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found");
    const isMatched = await user.comparePassword(password);
    if (!isMatched) return sendError(res, "email/password does not match!");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      user: { name: user.name, email: user.email, id: user._id, token: token },
    });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    if (!email) return sendError(res, "Please provide a valid email");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found, invalid request!");

    const token = await ResetToken.findOne({ owner: user._id });
    if (token) return sendError(res, "Only after one hour you can request for another token!");

    const newToken = await createRandomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: newToken });
    await resetToken.save();

    const baseUrl = process.env.BACKEND

    const url = `${baseUrl}/api/user/resetPassword?token=${newToken}&id=${user._id}`;
    const emailBody = await generatePasswordResetTemplate(url);
    await sendResetEmail(emailBody, user.email);
    console.log("Reset Email Sent Successfully");

    res.json({
      success: true,
      message: "Password reset link is sent to your email.",
    });
  }

  async resetPassword(req, res) {
    const { token, id } = req?.query; 
    const { newPassword } = req.body;
    if (!token || !id || !newPassword) {
      return sendError(res, 'Missing required parameters');
    }

    const resetToken = await ResetToken.findOne({ owner: id });
    if (!resetToken) {
      return sendError(res, 'Invalid or expired reset token');
    }

    const isValid = await bcrypt.compare(token, resetToken.token);
    if (!isValid) {
      return sendError(res, 'Invalid or expired reset token');
    }

    const user = await User.findById(id);
    if (!user) {
      return sendError(res, 'User not found');
    }

    user.password = newPassword;
    await user.save();

    await ResetToken.findByIdAndDelete(resetToken._id);

    res.json({ success: true, message: 'Password reset successfully' });
  }
}

module.exports = UserDataController;
