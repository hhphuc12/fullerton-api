import { IEventTypeModel } from './model';

export interface IEventTypeService {
  find(query?: Partial<IEventTypeModel>): Promise<IEventTypeModel[]>;

  findOne(code: string): Promise<IEventTypeModel>;

  insert(type: IEventTypeModel): Promise<IEventTypeModel>;

  remove(id: string): Promise<IEventTypeModel>;
}
