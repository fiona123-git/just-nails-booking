import express from 'express'
const router = express.Router()
import {
  addBookingItems,
  getBookingById,
  getMyBooking,
  getBooking,
  updateBooking,
  deleteBooking,

  
} from '../controllers/booking'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addBookingItems).get(protect, admin, getBooking)
router.route('/:id').get(protect, getBookingById)
router.route('/mybooking').get(protect, getMyBooking)
router.route('/booking').get(protect, getBooking)
router.route('/:id/update').put(protect, admin,updateBooking)
router.route('/:id/delete').delete(protect,deleteBooking )