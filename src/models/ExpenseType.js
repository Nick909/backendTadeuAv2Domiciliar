const mongoose = require('mongoose')

const expenseTypeSchema = new mongoose.Schema({
    description: String,
})

module.exports = mongoose.model('Expense_Type', expenseTypeSchema)