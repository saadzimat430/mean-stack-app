const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Marsupilami = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
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
    },
    friends: [
        {type: Schema.Types.ObjectId, ref: 'Marsupilami'}
    ]
}, {
    collection: 'marsupilamis'
})

module.exports = mongoose.model('Marsupilami', Marsupilami)