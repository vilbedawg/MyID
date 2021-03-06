export default class ApiError {
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static internal(msg) {
        return new ApiError(500, msg);
    }

    static unauthorized(msg) {
        return new ApiError(401, msg)
    }

    static forbidden(msg) {
        return new ApiError(403, msg)
    }
}