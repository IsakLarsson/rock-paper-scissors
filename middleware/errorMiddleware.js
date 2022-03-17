const errorHandling = (err, req, res, next) => {
    console.error(err);
    res.status(500).send("Oops something went wrong!");
};

module.exports = { errorHandling };
