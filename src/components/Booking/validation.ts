import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IBookingModel } from './model';

class BookingValidation extends Validation {
  constructor() {
    super();
  }

  createBooking(params: IBookingModel): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      time1: this.customJoi.string().required(),
      time2: this.customJoi.string().required(),
      time3: this.customJoi.string().required(),
      location: this.customJoi.string().required(),
      eventTypeId: this.customJoi.objectId().required(),
      userId: this.customJoi.objectId().required(),
    });

    return schema.validate(params);
  }

  updateBooking(params: IBookingModel): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      _id: this.customJoi.objectId().required(),
      time1: this.customJoi.string(),
      time2: this.customJoi.string(),
      time3: this.customJoi.string(),
      location: this.customJoi.string(),
      status: this.customJoi.string(),
      rejectReason: this.customJoi.string(),
      eventTypeId: this.customJoi.objectId(),
      userId: this.customJoi.objectId(),
    });

    return schema.validate(params);
  }

  getBooking(body: Partial<IBookingModel>): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }

  removeBooking(body: {
    id: string;
  }): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }
}

export default new BookingValidation();
