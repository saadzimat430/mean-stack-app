const express = require('express');
const marsupilamiRoute = express.Router();
const auth = require('../middleware/Auth');
const db = require('../db/db');
const mongoose = require('mongoose');

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

marsupilamiRoute.route('/addfriend/:id').put(async (req, res, next) => {
    const marsu = await Marsupilami.findById(req.params.id);

    friend = await Marsupilami.findById(req.body.id);

    marsu.friends.push(friend);
    await marsu.save();

    return res.send(marsu);
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