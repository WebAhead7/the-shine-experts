const db = require("../config/db");
const jwt = require("jsonwebtoken");

function logIn(req, res, next) {
    const SECRET = process.env.JWT_SECRET;

    const { email, password } = req.body;
    db.getUser({ email: email }, function (err, result) {
        if (err) {
            next(err);
        } else {
            if (result) {
                const user = result;
                if (password === user.password) {
                    const token = jwt.sign({ user: user._id }, SECRET, {
                        expiresIn: "1h",
                    });
                    const response = {
                        access_token: token,
                    };
                    res.status(200).send(response);
                } else {
                    const err = new Error("Unauthorized!");
                    err.status = 401;
                    next(err);
                }
            } else {
                next(err);
            }
        }
    });
}
module.exports = {
    logIn,
};