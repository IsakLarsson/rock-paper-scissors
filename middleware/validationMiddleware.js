const { validateFields } = require("../functions/functions");

/**
 * Assures that the given fields are present in a JSON object
 * @param {*} requiredFields
 * @returns
 */
const assureFields = (requiredFields) => {
    return (req, res, next) => {
        const body = req.body;
        if (!validateFields(body, requiredFields)) {
            res.status(400).json({
                message: `The request is missing a required field, the required fields are: ${requiredFields}`,
            });
            return;
        }
        next();
    };
};

/**
 * Assures that the given player name is not empty
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const assurePlayerName = (req, res, next) => {
    const playerName = req.body.name;
    if (playerName === "") {
        res.status(400).json({
            message: "The player name cannot be empty!",
        });
        return;
    }
    next();
};

module.exports = {
    assurePlayerName,
    assureFields,
};
