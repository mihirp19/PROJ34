import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/constants.js";
import { registerUser, loginUser } from "../services/authServices.js";

export const register = async (req, res) => {
    try {
        await registerUser(req.body);
        res.json({ message: SUCCESS_MESSAGES.USER_REGISTERED });
    } catch (err) {
        res.status(400).json({ error: ERROR_MESSAGES.EMAIL_EXISTS });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);
        res.json({ result: result.token, message: SUCCESS_MESSAGES.USER_LOGGED_IN });
    } catch (err) {
        res.status(400).json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS })
    };
};
