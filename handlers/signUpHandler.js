const model = require("../models/User");
const bcrypt = require("bcryptjs");

const addUser = (req, res, next) => {
    const { name, email, phone, password, type } = req.body;
    bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
            model
                .addUser({
                    name,
                    email,
                    phone,
                    password: hash,
                    type,
                })
                .then(() => {
                    const response = {
                        message: "you have successfully signed up",
                    };
                    res.status(200).send(response);
                })
                .catch(next)
        );
};

module.exports = { addUser };