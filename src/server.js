const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')

const app = express()
const routes = require('./routes')


mongoose.connect('mongodb://localhost:28017/appTadeuMelhorProfessorSQN', {
   useUnifiedTopology: true, 
   useNewUrlParser: true, 
   useCreateIndex: true,
})

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)
