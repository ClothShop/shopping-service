const express = require('express')
const connectDB = require('./config/db')
const cartRoutes = require('./routes/routes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/cart', cartRoutes)

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
