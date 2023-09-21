const mongoose = require('mongoose')



// Define Schema
const saleSchema = new mongoose.Schema({
  buyer: String,
  date: Date,
  quantity: Number,
  total: Number,
  game: String
})

saleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



// Export model
module.exports = mongoose.model('Sale', saleSchema)
