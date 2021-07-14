const user_model = require("../model/User");
const jwt = require("jsonwebtoken");

function auth (req, res, next) {
    const token = req.headers['token'];
    if (token) {
        const user = jwt.decode(token);
        if (user) {
            const userModel = new user_model();
            userModel.getUserByEmail(user.email, (error, rows) => {
                if (!error && rows.length > 0)
                    next();
            });
        }
        else
            res.status(403).json({message: "No token provided or token not valid."});
    }
    else
        res.status(403).json({message: "No token provided or token not valid."});
}

module.exports = auth;