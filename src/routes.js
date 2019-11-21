const express = require('express')
const routes  = express.Router()

const userControl    = require('./controllers/UserController')
const paymentControl = require('./controllers/PaymentController')
const typesControl   = require('./controllers/TypesControlle')

routes.post('/create', userControl.store)
routes.post('/login', userControl.show)


routes.post('/dashboadpayment', paymentControl.store)
routes.get('/findpayment', paymentControl.find)
routes.delete('/matapagamento', paymentControl.remove)

routes.post('/paymenttype', typesControl.paymentTypeStorage)
routes.get('/getpayment', typesControl.getPaytmen)
routes.post('/expensetype', typesControl.expenseTypeStorage)
routes.get('/getexpense', typesControl.getExpense)


module.exports = routes