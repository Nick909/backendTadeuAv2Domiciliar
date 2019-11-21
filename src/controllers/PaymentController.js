const Payment = require('../models/Payment')
const User = require('../models/User')
//index, store, 

module.exports = {
  async store(req, res) {
    let {
      description,
      dt_payment,
      dt_expire,
      value,
      fine_amount,
      interest_amount,
      payment_type,
      expense_type,
      user_id
    } = req.body
   // let { user_id } = req.headers
    
    try {
      
      const user = await User.findById(user_id)

      if (!user) {
        return res.status(401).json({ error: 'User does not exists' })
      }

      if(!value) value = 0 
      if(!fine_amount)  fine_amount = 0 
      if(!interest_amount)  interest_amount = 0


      const payment = await Payment.create({
        description,
        dt_payment,
        dt_expire,
        value,
        fine_amount,
        interest_amount,
        user: user_id,
        payment_type,
        expense_type
      })
      return res.json(payment)

    } catch (err) {
      return res.status(400).json({ error: `Deu merda: tipo de erro => ${err}` })
    }
  },

  async find(req, res) { 
    try{
      const { user_id } = req.headers
      const    user     = await User.findById(user_id)

      if(!user) return res.status(400).json({ error: 'User does not exists' })


      let { 
        startDate, 
        endDate,
        dt_payment,
        payment_type,
        expense_type,
      } = req.query

      const data = new Date()
      const gabiarraDate = 2
      
      const query = {}

      if(!startDate) startDate = data.toJSON(data.setDate(data.getDate() - gabiarraDate)) 
      data.toJSON(data.setDate(data.getDate() + gabiarraDate)) 
      if(!endDate)   endDate   = data.toJSON(data.getDate())

      query.user = {$eq: user._id}
      if (startDate)       query.dt_expire    = {$gte: startDate}
      if (endDate)         query.dt_expire    = {$lte: endDate}
      if (payment_type)    query.payment_type = {$eq: payment_type}
      if (expense_type)    query.expense_type = {$eq: expense_type}
      if (dt_payment == '1' ) query.dt_payment  = {$ne: null } 
      else if (dt_payment == '2') query.dt_payment = {$eq: null} 
      
      /**
       * if (dt_payment)   query.dt_payment = (dt_payment) ? {$ne: null } : {$eq: null} 
       * verdadeiro ele faz a pesquisa e se condição ternaria verdadeiro ele pesquisa onde
       * não é nulo se false ele pesquisa onde não é nulo
       */
      const paymentFilterList = await Payment.find(query).sort('dt_expire').populate('payment_type expense_type user')
      return res.json(paymentFilterList) 
      
    }catch (error) {
      return res.status(400).json({ message: ` deu merda 12 ${error}` })
    }
  },

  async remove(req, res) {
    try {
      const { _id } = req.query
  
      if(!_id) {
        return res.status(401).json({ message: 'folha de pagamento não existe'})
      }
      const payment = await Payment.deleteOne({_id})
  
      return res.json(payment)
      
    }catch (error) {
      return res.status(400).json({ message: `deu meda fi ${error}`})
    }
  },

  async update(req, res) {
    
  }
}