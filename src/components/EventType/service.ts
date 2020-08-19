import * as Joi from '@hapi/joi';
import { Types } from 'mongoose';
import EventTypeModel, { IEventTypeModel } from './model';
import EventTypeValidation from './validation';
import { IEventTypeService } from './interface';

const EventTypeService: IEventTypeService = {
  async find(query: Partial<IEventTypeModel>): Promise<IEventTypeModel[]> {
    try {
      return await EventTypeModel.find(query || {});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findOne(id: string): Promise<IEventTypeModel> {
    try {
      const validate: Joi.ValidationResult = EventTypeValidation.getEventType({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await EventTypeModel.findOne(
        {
          _id: Types.ObjectId(id),
        },
        {
          password: 0,
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async insert(body: IEventTypeModel): Promise<IEventTypeModel> {
    try {
      const validate: Joi.ValidationResult = EventTypeValidation.createEventType(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const eventType: IEventTypeModel = await EventTypeModel.create(body);

      return eventType;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async remove(id: string): Promise<IEventTypeModel> {
    try {
      const validate: Joi.ValidationResult = EventTypeValidation.removeEventType({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const eventType: IEventTypeModel = await EventTypeModel.findOneAndRemove({
        _id: Types.ObjectId(id),
      });

      return eventType;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default EventTypeService;
