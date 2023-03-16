const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const noteSchema = mongoose.Schema({
    date: {
        type: String,
    },
    note: {
        type: String,
    },
    title: {
        type: String
    }
})

module.exports = new mongoose.model('login', noteSchema);