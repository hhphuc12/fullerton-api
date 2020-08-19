import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IUserModel } from '@/components/User/model';

class AuthValidation extends Validation {
    constructor() {
        super();
    }

    createUser(params: IUserModel): Joi.ValidationResult {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }

    getUser(params: IUserModel): Joi.ValidationResult {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }
}

export default new AuthValidation();
