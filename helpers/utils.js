const utilsHelper = {};

utilsHelper.sendResponse = (res, status, success, data, errors, message) => {
    const response = {};
    if (success) response.success = success;
    if (data) response.data = data;
    if (errors) response.errors = errors;
    if (message) response.message = message;
    return res.status(status).json(response);
};

utilsHelper.generateRandomHexString = (len) => {
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString("hex") // convert to hexadecimal format
        .slice(0, len)
        .toUpperCase(); // return required number of characters
};

utilsHelper.catchAsync = (func) => (req, res, next) =>
    func(req, res, next).catch((err) => next(err));

class AppError extends Error {
    constructor(statusCode, message, errorType) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

utilsHelper.AppError = AppError;
module.exports = utilsHelper;