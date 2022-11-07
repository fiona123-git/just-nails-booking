
const mongoose = require('mongoose')
// create the schema for the booking

const treatmentSchema = mongoose.Schema(
  {// include user 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // schema for the booking
    name: {
      type: String,
      required: true,
    },
    description:{
        type: Number, 
        required: true,
    },
    price: {
      type: Number,
      required: true,
      
    },
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Treatment', treatmentSchema)