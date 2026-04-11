function errorHandler(err, req, res, next) {
    console.error("Global Error Handler caught:", err);

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    const response = {
        error: {
            message
        }
    };

    res.status(statusCode).json(response);
}

export default errorHandler;
