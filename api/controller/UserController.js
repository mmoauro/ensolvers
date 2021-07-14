const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_model = require("../model/User");
class UserController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.model = new user_model();
    }
    login () {
        let email = this.req.body.email;
        let password = this.req.body.password;
        this.model.getUserByEmail(email, (error, user) => {
            if (!error && user.length > 0) {
                bcrypt.compare(password, user[0].password, (err, res) => {
                    if (!err && res) {
                        let payload = {
                            id: user[0].id,
                            email: user[0].email
                        }
                        let token = jwt.sign(payload, 'ensolvers');
                        this.res.status(200).json({token: token});
                    }
                    else
                        this.res.status(401).json({message: 'Incorrect email or password.'});
                });
            }
            else
                this.res.status(401).json({message: 'Incorrect email or password.'});

        })
    }

}
module.exports = UserController;