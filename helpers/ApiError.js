
class ApiError {
    constructor({clientErrorMessage = '', debugErrorMessage = '', inputValidationErrors}) {
        this.clientErrorMessage = clientErrorMessage;
        this.debugErrorMessage = debugErrorMessage;
        this.inputValidationErrors = inputValidationErrors;
    }
  }

  module.exports = ApiError;