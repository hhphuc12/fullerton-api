import * as Joi from '@hapi/joi';
import { Types } from 'mongoose';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';

const UserService: IUserService = {
  async find(query: Partial<IUserModel>): Promise<IUserModel[]> {
    try {
      return await UserModel.find(query || {});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findOne(id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.getUser({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await UserModel.findOne(
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

  async insert(body: IUserModel): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.createUser(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.create(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async remove(id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.removeUser({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.findOneAndRemove({
        _id: Types.ObjectId(id),
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default UserService;
