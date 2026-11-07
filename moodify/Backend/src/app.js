const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth.routes')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',  // tumhare Vite frontend ka URL
  credentials: true                 // agar cookies/JWT cookie use kar rahe ho
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)

module.exports = app