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
            return res.status(400).json({
                message: `The request is missing a required field, the required fields are: ${requiredFields}`,
            });
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
        return res.status(400).json({
            message: "The player name cannot be empty!",
        });
    }
    next();
};

module.exports = {
    assurePlayerName,
    assureFields,
};
