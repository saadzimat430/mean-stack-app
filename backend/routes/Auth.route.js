const express = require("express");
const {
    check,
    validationResult
} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRoute = express.Router();
const auth = require('../middleware/Auth');
let cookieParser = require('cookie-parser');

let Marsupilami = require('../models/Marsupilami');

authRoute.post(
    "/signup",
    [
        check("login", "Veuillez entrez un login valide")
        .not()
        .isEmpty(),
        check("password", "Veuillez entrez un mot de passe valide").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            login,
            password,
            age,
            famille,
            race,
            nourriture
        } = req.body;
        try {
            let marsupilami = await Marsupilami.findOne({
                login
            });
            if (marsupilami) {
                return res.status(400).json({
                    msg: "Ce Marsupilami déjà existe."
                });
            }

            marsupilami = new Marsupilami({
                login,
                password,
                age,
                famille,
                race,
                nourriture
            });

            const salt = await bcrypt.genSalt(10);
            marsupilami.password = await bcrypt.hash(password, salt);

            await marsupilami.save();

            const payload = {
                marsupilami: {
                    id: marsupilami.id,
                    login: marsupilami.login,
                    age: marsupilami.age,
                    famille: marsupilami.famille,
                    race: marsupilami.race,
                    nourriture: marsupilami.nourriture
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Erreur pendant la sauvegarde");
        }
    }
);


authRoute.post(
    "/login",
    [
        check("login", "Veuillez entrez un login valide").not().isEmpty(),
        check("password", "Veuillez entrez un mot de passe valide").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            login,
            password
        } = req.body;
        try {
            let marsupilami = await Marsupilami.findOne({
                login
            });
            if (!marsupilami)
                return res.status(400).json({
                    message: "Ce marsupilami est inexistant"
                });

            const isMatch = await bcrypt.compare(password, marsupilami.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Mot de passe invalide"
                });

            const payload = {
                marsupilami: {
                    id: marsupilami.id,
                    login: marsupilami.login,
                    age: marsupilami.age,
                    famille: marsupilami.famille,
                    race: marsupilami.race,
                    nourriture: marsupilami.nourriture
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 86400
                },
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {
                        maxAge: 86400
                    });
                    res.status(200).json({
                        token,
                        expiresIn: 86400
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

authRoute.get("/me", auth, async (req, res) => {
    try {
        const marsupilami = await Marsupilami.findById(req.marsupilami.id);
        res.json(marsupilami);
    } catch (e) {
        res.send({
            message: "Erreur lors de la récupération du marsupilami"
        });
    }
});

module.exports = authRoute;