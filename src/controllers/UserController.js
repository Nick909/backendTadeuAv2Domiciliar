
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email } = req.body

        try {
            let user = await User.findOne({ email })

            if(user) {
                return res.status(400).json({ message: 'email já existe'})
            } else {
                user = await User.create(req.body)
            }
            
            user.password = undefined

            return res.json(user)

        } catch (err) {
            return res.status(400).json({ message: `deu merda - ${err}`})
        }
    },

    /**
     * @api { POST } /login login no sistema
     * @apiSuccess (200) { String } status sucesso retonor 200
     * @param {*} req 
     * @param {*} res 
     */
    async show(req, res) {
        const { email, password } = req.body

        try {
            let user = await User.findOne({ email }).select('+password')
            
            if(!user) {
                return res.status(400).json({ message: `user not exist`})
            }

            user.password = undefined
            
            return res.json(user)
        } catch (err) {
            return res.status(400).json({ message: `deu merda - ${err}`})
        }
    },


}