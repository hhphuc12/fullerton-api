import * as Joi from '@hapi/joi';
import { Types } from 'mongoose';
import BookingModel, { IBookingModel, BookingStatus } from './model';
import BookingValidation from './validation';
import { IBookingService } from './interface';

const BookingService: IBookingService = {
  async find(query: Partial<IBookingModel>): Promise<IBookingModel[]> {
    try {
      return await BookingModel.find(query || {}).populate('eventTypeId');
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findOne(id: string): Promise<IBookingModel> {
    try {
      const validate: Joi.ValidationResult = BookingValidation.getBooking({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await BookingModel.findOne({ _id: Types.ObjectId(id) });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async insert(body: IBookingModel): Promise<IBookingModel> {
    try {
      const validate: Joi.ValidationResult = BookingValidation.createBooking(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const booking: IBookingModel = await BookingModel.create(body);

      return booking;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async update(body: IBookingModel): Promise<IBookingModel> {
    try {
      const validate: Joi.ValidationResult = BookingValidation.updateBooking(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const { _id, ...newData } = body;
      const oldBooking = await BookingModel.findById({ _id }).lean();

      if (
        (newData.status === BookingStatus.APPROVED || newData.status === BookingStatus.REJECT)
        && oldBooking.status !== BookingStatus.PENDING
      ) {
        throw 'Bad request!';
      }

      await BookingModel.findOneAndUpdate(
        { _id },
        { ...oldBooking, ...newData },
      );

      return await BookingModel.findOne({ _id });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async remove(id: string): Promise<IBookingModel> {
    try {
      const validate: Joi.ValidationResult = BookingValidation.removeBooking({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const booking: IBookingModel = await BookingModel.findOneAndRemove({
        _id: Types.ObjectId(id),
      });

      return booking;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default BookingService;
