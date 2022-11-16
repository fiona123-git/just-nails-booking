
const asyncHandler = require('express-async-handler')
const Treatment = require ('../models/Treatment')

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



const createTreatment = asyncHandler (async(res ,req)=>{
  
 /* const treatment = new Treatment({
    
 
  })
  
    
    const createdTreatment = await treatment.save()
  
  res.status(200).json(createdTreatment)*/
 try {
    const treatment = await Treatment.findOne({ treatment: req.body.treatment });
    if (treatment) {
      return res.status(200).send({
        success: false,
        message: "Bus already exists",
      });
    }
  const createdTreatment = new Treatment(req.body);
    await createdTreatment.save();
    return res.status(200).send({
      success: true,
      message: "treatment added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
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