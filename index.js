const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = 4000
const app = express()
dotenv.config()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to mongoDB")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
})

app.use("/api/hotels", require('./routes/hotels'))
app.use("/api/auth", require('./routes/auth'))
app.use("/api/users", require('./routes/users'))
app.use("/api/rooms", require('./routes/rooms'))

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(PORT, () => {
  connect()
  console.log(`Backend server is running on port ${PORT}`)
})


