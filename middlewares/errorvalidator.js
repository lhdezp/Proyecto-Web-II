const ApiError = require('../helpers/ApiError.js');
class ErrorMiddleware {
    /**
     * Middleware to try and catch all errors in my endpoints
     * @param {*} endpoint 
     * @returns 
     */
    constructor() {
        ErrorMiddleware.instance = null;
    }

    secureAsync(endpoint) {
        return async (req, res, next) => {
            try {
                await endpoint(req, res, next);
            } catch (error) {
                next(error);
            }
        }
    }

    errorResponder(error, request, response, next) {
        response.status(500).json(new ApiError({ clientErrorMessage:"Internarl Server Error",debugErrorMessage: "" }));
        next(error);
    }
    
    static getErrorInstance(){
        if (!ErrorMiddleware.instance) {
            ErrorMiddleware.instance = new ErrorMiddleware(); 
        }
        return ErrorMiddleware.instance;
    }
}

module.exports = ErrorMiddleware;