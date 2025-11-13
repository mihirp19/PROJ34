import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "../constants/constants.js";

export const registerUser = async ({ name, email, password }) => {
    const exists = await User.findOne({ email });
    if (exists) throw new Error(ERROR_MESSAGES.EMAIL_EXISTS);

    const password_hash = await bcrypt.hash(password, 10);
    return await User.create({ name, email, password_hash });
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        console.warn(`Login failed for ${email}: invalid credentials`);
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { token, user };
};
