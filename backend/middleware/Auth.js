const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({
        message: "Erreur d'authentification"
    });
    
    try {
        const decoded = jwt.verify(token, "randomString");
        req.marsupilami = decoded.marsupilami;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({
            message: "Token invalide"
        });
    }
};