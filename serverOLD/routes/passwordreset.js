const express = require('express');
const PasswordResetRouter = express.Router();
const firebase = require('firebase-admin');

PasswordResetRouter.post("/reset", async (req, res) => {
    const { email } = req.body;
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        return res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return res.status(500).json({ error: 'Failed to send password reset email' });
    }
});

module.exports = PasswordResetRouter;