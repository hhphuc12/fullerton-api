import { Document, Schema } from 'mongoose';
import * as connections from '@/config/connection/connection';

export interface IEventTypeRequest {
  id: string;
  email: string;
}

export interface IEventTypeModel extends Document {
  type: string;
  protected: boolean;
}

const EventTypeSchema: Schema = new Schema(
  {
    type: {
      type: String,
      unique: true,
    },
    protected: Boolean,
  },
  {
    collection: 'eventTypes',
    versionKey: false,
  }
);

export default connections.db.model<IEventTypeModel>('EventTypeModel', EventTypeSchema);
