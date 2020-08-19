import { IUserModel } from '@/components/User/model';

export interface IAuthService {
    createUser(IUserModel: IUserModel): Promise<IUserModel>;
    getUser(IUserModel: IUserModel): Promise<IUserModel>;
}
