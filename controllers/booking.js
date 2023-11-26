/** create booking 
 * delete booking
 * update booking
 * get booking
 *  with user and admin access
 * 
 * 
 * 
 */

const asyncHandler = require('express-async-handler')



const Treatment = require('../models/Treatment')
const Booking = require('../models/Booking')
 const User =  require('../models/User')


const getBookingbyId= asyncHandler(async(res, req) =>{
 const treatment = await Treatment.findOne({ userId: req.body.userId });
 const booking = await Booking.find({ treatmentId: treatment._id });
      
 if(booking) {
 res.json(booking)
       
  

    } else { (error) 
      console.log(error);
      res.status(500).send({
        message: "Error fetching booking",
        success: false,
        error,
      });
    }
  }
)


module.exports={
  getBookingbyId
}