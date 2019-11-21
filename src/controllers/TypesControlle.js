const PaymentType = require('../models/PaymentType')
const ExpenseType = require('../models/ExpenseType')

module.exports = {

    async paymentTypeStorage(req, res) {
        const { description } = req.body

        try{
            let paymentType = await PaymentType.findOne({description})

            if(paymentType) return res.status(400).json({message: 'payment type already exists'})
            else paymentType = await PaymentType.create(req.body)
            
                
            return res.status(200).json(paymentType)
        } catch(error) {
            return res.status(400).json({ message: `deu ruim mano ${error}` })
        }
    },

    async expenseTypeStorage(req, res) {
        const { description } = req.body

        try{
            let expenseType = await ExpenseType.findOne({ description })
            
            if(expenseType) return res.status(400).json({ message: `Expense Type alrady exists` })
            else expenseType = await ExpenseType.create(req.body)

            return res.json(expenseType)
        }catch (error) {
            return res.status(400).json({ message: `deu ruim mano ${error}` })
        }
    },

    async getExpense(req, res) {
        const get = await ExpenseType.find({}).sort('1 description')
        
        //console.log(get)
        if(!get) return res.status(400).json({ message: `ei aqui ta vazio, pede pro corno do admin ai \ncadastrar uns`})

        return res.json(get)
    },

    async getPaytmen(req, res) {
        try {
            const get = await PaymentType.find({}).sort('1 description')
            //console.log(get)
            if(!get) return res.status(400).json({ message: `ei aqui ta vazio, pede pro corno do admin ai \ncadastrar uns`})

            return res.json(get)
        }catch (error) {
            return res.status(400).json({message: error})
        }
    },

    
}