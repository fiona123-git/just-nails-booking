
const asyncHandler = require('express-async-handler')
const Treatment = require ('../models/Treatment')

/**const getTreatment= asyncHandler(async(res, req) =>{
 
})
 */

const getTreatment = asyncHandler(async (req, res) => {
    // match the id of the user
    const treatment = await Treatment.find({
        user: req.user.id
    })

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
    name,
    
    description,
    price
 } = req.body

  const treatment = await Treatment.findById(req.params.id)

  if (treatment) {

    treatment.name = name
    treatment.description = description
    treatment.price= price
    const updatedTreatment = await treatment.save()
    res.json(updatedTreatment)
  } else {
    res.status(404)
    throw new Error('treatment not found')
  }
})



const createTreatment = asyncHandler (async(res ,req)=>{
  const treatment = new Treatment.create({
        treatment, user: req.user._id,price, time, date
  })
    
    const createdTreatment = await treatment.save()
  
  res.status(200).json(createdTreatment)
})

const deleteTreatment = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findById(req.params.id)

  if (treatment) {
    await treatment.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})






module.exports={
getTreatmentById,
getTreatment,
deleteTreatment,
createTreatment,
updateTreatment
}