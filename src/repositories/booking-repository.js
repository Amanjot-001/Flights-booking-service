const { Booking } = require('../models')
const CrudRepository = require('./crud-repository')
const AppError = require('../utils/errors/app-errors')

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await Booking.create(data, { transaction: transaction });
        return response;
    }

    async get(data, transaction) {
        const response = await Booking.get(data, { transaction: transaction });
        if (!response) {
            throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

module.exports = BookingRepository;