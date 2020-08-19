import { IUserModel } from './model';

export interface IUserService {
  find(query?: Partial<IUserModel>): Promise<IUserModel[]>;

  findOne(code: string): Promise<IUserModel>;

  insert(user: IUserModel): Promise<IUserModel>;

  remove(id: string): Promise<IUserModel>;
}
