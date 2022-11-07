const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
       treatment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Treatment',
    }, 
    
   
   
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
