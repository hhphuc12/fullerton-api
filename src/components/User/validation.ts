import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IUserModel } from './model';

class UserValidation extends Validation {
  constructor() {
    super();
  }

  createUser(params: IUserModel): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(),
    });

    return schema.validate(params);
  }

  getUser(body: Partial<IUserModel>): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }

  removeUser(body: {
    id: string;
  }): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }
}

export default new UserValidation();
