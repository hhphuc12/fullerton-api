import { Document, Schema, SchemaTypes } from 'mongoose';
import * as connections from '@/config/connection/connection';

export interface IBookingRequest {
  id: string;
  email: string;
}

export const enum BookingStatus {
  APPROVED = 'APPROVED',
  REJECT = 'REJECT',
  PENDING = 'PENDING',
}

export interface IBookingModel extends Document {
  eventTypeId: string;
  location: string;
  status: string;
  time1: string;
  time2: string;
  time3: string;
  userId: string;
  rejectReason?: string;
}

const BookingSchema: Schema = new Schema(
  {
    eventTypeId: {
      type: SchemaTypes.ObjectId,
      ref: 'EventTypeModel',
    },
    location: String,
    status: {
      type: String,
      default: BookingStatus.PENDING,
    },
    time1: Date,
    time2: Date,
    time3: Date,
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'UserModel',
    },
    rejectReason: String,
  },
  {
    collection: 'bookings',
    versionKey: false,
  }
);

export default connections.db.model<IBookingModel>('BookingModel', BookingSchema);
