"use strict";

var express = require("express");

var _require = require("express-validator/check"),
    check = _require.check,
    validationResult = _require.validationResult;

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var authRoute = express.Router();

var auth = require('../middleware/Auth');

var cookieParser = require('cookie-parser');

var Marsupilami = require('../models/Marsupilami');

authRoute.post("/signup", [check("login", "Veuillez entrez un login valide").not().isEmpty(), check("password", "Veuillez entrez un mot de passe valide").isLength({
  min: 6
})], function _callee(req, res) {
  var errors, _req$body, login, password, age, famille, race, nourriture, marsupilami, salt, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, login = _req$body.login, password = _req$body.password, age = _req$body.age, famille = _req$body.famille, race = _req$body.race, nourriture = _req$body.nourriture;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(Marsupilami.findOne({
            login: login
          }));

        case 7:
          marsupilami = _context.sent;

          if (!marsupilami) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: "Ce Marsupilami déjà existe."
          }));

        case 10:
          marsupilami = new Marsupilami({
            login: login,
            password: password,
            age: age,
            famille: famille,
            race: race,
            nourriture: nourriture
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 13:
          salt = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 16:
          marsupilami.password = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(marsupilami.save());

        case 19:
          payload = {
            marsupilami: {
              id: marsupilami.id
            }
          };
          jwt.sign(payload, "randomString", {
            expiresIn: 10000
          }, function (err, token) {
            if (err) throw err;
            res.status(200).json({
              token: token
            });
          });
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0.message);
          res.status(500).send("Erreur pendant la sauvegarde");

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 23]]);
});
authRoute.post("/login", [check("login", "Veuillez entrez un login valide").not().isEmpty(), check("password", "Veuillez entrez un mot de passe valide").isLength({
  min: 6
})], function _callee2(req, res) {
  var errors, _req$body2, login, password, marsupilami, isMatch, payload;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body2 = req.body, login = _req$body2.login, password = _req$body2.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Marsupilami.findOne({
            login: login
          }));

        case 7:
          marsupilami = _context2.sent;

          if (marsupilami) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Ce marsupilami est inexistant"
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, marsupilami.password));

        case 12:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Mot de passe invalide"
          }));

        case 15:
          payload = {
            marsupilami: {
              id: marsupilami.id
            }
          };
          jwt.sign(payload, "randomString", {
            expiresIn: 86400
          }, function (err, token) {
            if (err) throw err;
            res.cookie('token', token, {
              maxAge: 86400
            });
            res.status(200).json({
              token: token,
              expiresIn: 86400
            });
          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Server Error"
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 19]]);
});
authRoute.get("/me", auth, function _callee3(req, res) {
  var marsupilami;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Marsupilami.findById(req.marsupilami.id));

        case 3:
          marsupilami = _context3.sent;
          res.json(marsupilami);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.send({
            message: "Erreur lors de la récupération du marsupilami"
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = authRoute;