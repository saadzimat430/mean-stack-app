const express = require('express');
const app = express();
const marsupilamiRoute = express.Router();
const auth = require('../middleware/Auth');

let Marsupilami = require('../models/Marsupilami');

marsupilamiRoute.route('/create').post((req, res, next) => {
    Marsupilami.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

marsupilamiRoute.route('/').get((req, res) => {
    Marsupilami.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

marsupilamiRoute.route('/read/:id').get((req, res) => {
    Marsupilami.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

marsupilamiRoute.route('/update/:id').put((req, res, next) => {
    Marsupilami.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})

marsupilamiRoute.route('/delete/:id').delete((req, res, next) => {
    Marsupilami.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = marsupilamiRoute;