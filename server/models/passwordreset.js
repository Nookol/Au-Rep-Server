const firebase = require('firebase-admin');

class PasswordResetModel {
    constructor(email) {
        this.email = email;
    }

    async sendResetEmail() {
        try {
            await firebase.auth().sendPasswordResetEmail(this.email);
            return { success: true, message: 'Password reset email sent successfully' };
        } catch (error) {
            console.error('Error sending password reset email:', error);
            return { success: false, message: 'Failed to send password reset email' };
        }
    }
}

module.exports = PasswordResetModel;
