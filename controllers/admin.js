const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Treatment = require("../models/treatment");
const authMiddleware = require("../middlewares/authMiddleware");
const { default: axios } = require("axios");

const getAllTreatment= asyncHandler(async(res, req) =>{
    const treatments = await Treatment.find({})
})

exports.get("/get-all-treatment", authMiddleware, async (req, res) => {
  try {
    const treatments = await Treatment.find({});
    res.status(200).send({
      message: "treatment details fetched successfully",
      success: true,
      data: treatments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error ",
      success: false,
      error,
    });
  }
});

exports.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying  account",
      success: false,
      error,
    });
  }
});



exports.post(
  "/change-treatment",
  authMiddleware,
  async (req, res) => {
    try {
      const { treatmentId, status } = req.body;
      const treatment = await Treatment.findByIdAndUpdate(treatmentId, {
        status,
      });

      const user = await User.findOne({ _id: treatmentId.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-treatmentr-request-changed",
        message: `Your  treatment has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isTreatment = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "treatment updated successfully",
        success: true,
        data: treatment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying treatment details",
        success: false,
        error,
      });
    }
  }
);



const updateTreatment= asyncHandler(async(res, req) =>{
    const { treatmentId, status } = req.body;
 const treatment = await Treatment.findByIdAndUpdate(treatmentId, {
        status,
      });
 if (treatment) {
    res.json(treatment)
  } else {
    res.status(404)
    throw new Error('treatment not found')
  }
       


     const user = await User.findOne({ _id: treatmentId.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-treatmentr-request-changed",
        message: `Your  treatment has been updated ${status}`,
        onClickPath: "/notifications",
      });
})