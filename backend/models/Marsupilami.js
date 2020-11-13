const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Marsupilami = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    famille: {
        type: String
    },
    race: {
        type: String
    },
    nourriture: {
        type: String
    },
    dateCreation: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'marsupilamis'
})

module.exports = mongoose.model('Marsupilami', Marsupilami)