const errorHandling = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    console.error(process.env.NODE_ENV == "development" ? err.stack : "");
    res.status(statusCode).json({
        message: err.message
            ? err.message
            : "Oops, seems I've encountered an error!",
    });
};

module.exports = { errorHandling };
