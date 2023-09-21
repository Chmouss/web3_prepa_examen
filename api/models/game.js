const mongoose = require('mongoose')



// Define Schema
const gameSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
})

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



// Export model
module.exports = mongoose.model('Game', gameSchema)
