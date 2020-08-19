import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IEventTypeModel } from './model';

class EventTypeValidation extends Validation {
  constructor() {
    super();
  }

  createEventType(params: IEventTypeModel): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      type: Joi.string()
        .required(),
    });

    return schema.validate(params);
  }

  getEventType(body: Partial<IEventTypeModel>): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }

  removeEventType(body: {
    id: string;
  }): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }
}

export default new EventTypeValidation();
