const { getAll, create, remove, update } = require('../controllers/booking.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const bookingRouter = express.Router();

bookingRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

bookingRouter.route('/:id')
    //.get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = bookingRouter;