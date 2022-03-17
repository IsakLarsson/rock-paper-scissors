const errorHandling = (err, req, res, next) => {
    console.error(err);
    res.status(500).send("Oops, seems I've encountered an error!");
};

module.exports = { errorHandling };
