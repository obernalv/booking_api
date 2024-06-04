const express = require('express');

const userRouter = require('./user.router');
const cityRouter = require('./city.router');
const reviewRouter = require('./review.router');
const hotelRouter = require('./hotel.router');
const bookingRouter = require('./booking.router');
const imageRouter = require('./image.router');

const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter);
router.use('/cities', cityRouter);
router.use('/reviews', reviewRouter);
router.use('/hotels', hotelRouter);
router.use('/bookings', bookingRouter);
router.use('/images', imageRouter);

module.exports = router;