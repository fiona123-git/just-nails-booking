
const asyncHandler = require('express-async-handler')
const Treatment = require ('../models/Treatment')
const User = require('../models/User')
/**const getTreatment= asyncHandler(async(res, req) =>{
 
})
 */

const getTreatment = asyncHandler(async (req, res) => {
    // match the id of the user
    const treatment = await Treatment.find({ user: req.user.id})
 
  

    res.status(200).json(treatment)
  
})

const getTreatmentById = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findById(req.params.id)

  if (treatment) {
    res.json(treatment)
  } else {
    res.status(404)
    throw new Error('treatment not found')
  }
})




const updateTreatment = asyncHandler(async (req, res) => {
  const {
    therapy,
    
    description,
    price
 } = req.body

  const treatment = await Treatment.findById(req.params.body)

  if (treatment) {

    treatment.therapy = therapy
    treatment.description = description
    treatment.price= price
    
    const updatedTreatment = await Treatment.save()
    res.json(updatedTreatment)
  } else {
    res.status(404)
    throw new Error('treatment not found')
  }
})

// create  treatment
const createTreatment = asyncHandler(async(req, res)=>{
console.log(req.body)
// if fields not entered the error to add field
 if(!req.body){
   res.status(400)
        throw new Error('Please add a text field')
    }
    // create new treatment
    const treatment = new Treatment({
    
     // new treatment requires models + body to validate using user
    user: req.user._id,
     therapy: req.body.therapy,
    
  
     description: req.body.description,
     price: req.body.price
     
  })
 // const treatment  will wait for the promise to fufill and save 
 

  const createdTreatment = await treatment.save()
  res.status(201).json(createdTreatment)
})
 
 
     
            


      



  



const deleteTreatment = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findById(req.params.id)

  if (treatment) {
    await treatment.remove()
    res.json({ message: 'treatment removed' })
  } else {
    res.status(404)
    throw new Error('treatment not found')
  }
})






module.exports={
getTreatmentById,
getTreatment,
deleteTreatment,
createTreatment,
updateTreatment
}