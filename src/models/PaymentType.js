const mongoose = require('mongoose')

const payTypeSchema = new mongoose.Schema({
    description: String,
})

module.exports = mongoose.model('Payment_Type', payTypeSchema)