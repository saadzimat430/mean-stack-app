const express = require('express');
const marsupilamiRoute = express.Router();
const auth = require('../middleware/Auth');
const db = require('../db/db');
const mongoose = require('mongoose');

let Marsupilami = require('../models/Marsupilami');
const {
    json
} = require('body-parser');

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

marsupilamiRoute.route('/addfriend/:id').put(async (req, res) => {
    const marsu = await Marsupilami.findById(req.params.id);

    let friend = await Marsupilami.findById(req.body.id);

    if (!marsu.friends.includes(friend.id)) {
        await marsu.friends.push(friend);
    }

    await marsu.save();

    let awt = await Marsupilami.findById(marsu.friends[1]);

    return res.json(marsu);
})

marsupilamiRoute.route('/getfriends/:id').get(async (req, res) => {
    const marsu = await Marsupilami.findById(req.params.id);
    let arr = [];
    let data = {};

    for (let i = 0; i < marsu.friends.length; i++) {
        let marsu_ = await Marsupilami.findById(marsu.friends[i]);
        data = {
            id: marsu_._id,
            login: marsu_.login,
            race: marsu_.race,
            famille: marsu_.famille,
            nourriture: marsu_.nourriture
        }
        await arr.push(data);
    }

    return res.send(arr);

})

marsupilamiRoute.route('/removefriend/:id').put(async (req, res) => {
    const marsu = await Marsupilami.findById(req.params.id);

    const index = await marsu.friends.indexOf(req.body.id);
    if (index > -1) {
        await marsu.friends.splice(index, 1);
    } else {
        return res.status(400).json({
            msg: "Ce marsupilami n'est pas votre ami."
        });
    }

    await marsu.save();

    return res.status(200);
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