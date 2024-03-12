const { Sequelize } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const axios = require('axios');
const { BookingRepository } = require('../repositories')
const AppError = require('../utils/errors/app-errors')
const { ServerConfig } = require('../config')

const db = require('../models')

async function createBooking(data) {
    try {
        const result = await db.sequelize.transaction(async function bookingImplementation(t) {
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`)
            const flightData = flight.data.data
            if(data.noOfSeats > flightData.totalSeats) {
                throw new AppError('required number of seats not available', StatusCodes.BAD_REQUEST);
            }
            return true;
        });
    } catch (error) {
        console.log(error)
        throw error
        // throw new AppError('Cannot create a new Booking object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createBooking
}