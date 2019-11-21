const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    description: String,
    dt_payment: Date,
    dt_expire: Date,
    value: mongoose.Decimal128,
    fine_amount: mongoose.Decimal128,
    interest_amount: mongoose.Decimal128,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    payment_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment_Type',
    },
    expense_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense_Type',
    }

})

module.exports = mongoose.model('Payment', paymentSchema)