const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, lowercase: true, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function hashPassword(next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password);
    },

    generateToken() {
        return jwt.sing({ id: this.id }, "secret", {
            expiresIn: 86400
        });
    }
};

mongoose.model('users', UserSchema );