import { IBookingModel } from './model';

export interface IBookingService {
  find(query?: Partial<IBookingModel>): Promise<IBookingModel[]>;

  findOne(code: string): Promise<IBookingModel>;

  insert(IBookingModel: IBookingModel): Promise<IBookingModel>;

  update(IBookingModel: IBookingModel): Promise<IBookingModel>;

  remove(id: string): Promise<IBookingModel>;
}
