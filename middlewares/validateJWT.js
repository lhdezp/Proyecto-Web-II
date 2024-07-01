
const jwt = require('jsonwebtoken');

const ApiError = require('../helpers/ApiError');

const validateJWT = async (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json(
            new ApiError({ clientErrorMessage: 'Lang.SESSION_INVALID', debugErrorMessage: "noTokenError" })
        );
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).json(new ApiError({ clientErrorMessage: 'Lang.SESSION_INVALID', debugErrorMessage: error }));
    }
};

module.exports = {
    validateJWT
}