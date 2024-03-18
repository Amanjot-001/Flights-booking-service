const { StatusCodes } = require('http-status-codes')
const { BookingService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common')

async function createBooking(req, res) {
    try {
        const booking = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        })
        SuccessResponse.data = booking;
        SuccessResponse.message = 'Successfully created an booking';
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating booking';
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function makePayment(req, res) {
    try {
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully payed for an booking';
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while making payment for booking';
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createBooking,
    makePayment
}