function errorHandler(err, req, res, next) {
    console.error("Global Error Handler caught:", err);
    
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    
    // In production, we might not want to leak stack traces
    const response = {
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        }
    };

    res.status(statusCode).json(response);
}

export default errorHandler;
