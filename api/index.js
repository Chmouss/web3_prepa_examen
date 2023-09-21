const { MONGODB_URI, PORT } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const middlewares = require('./utils/middlewares')
const gamesRouter = require('./routes/games')
const salesRouter = require('./routes/sales')


// Connect to database
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Unable to connect to database", err))

// Create server
const app = express()

// Init server
app.use(cors())
app.use(express.json())
app.use(middlewares.logger)

app.use(middlewares.errorHandler)

app.use('/games',gamesRouter)
app.use('/sales',salesRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})