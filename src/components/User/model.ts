import { NextFunction } from 'express';
import { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as connections from '@/config/connection/connection';

export interface IUserRequest {
  id: string;
  email: string;
}

export const enum Permission {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUserModel extends Document {
  email: string;
  password: string;
  permission: string;
  tokens?: AuthToken[];
  comparePassword?: (password: string) => Promise<boolean>;
}

export type AuthToken = {
  accessToken: string;
  kind: string;
};

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    permission: String,
    tokens: Array,
  },
  {
    collection: 'users',
    versionKey: false,
  }
).pre('save', async function (next: NextFunction): Promise<void> {
  const user: any = this; // tslint:disable-line

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt: string = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    const match: boolean = await bcrypt.compare(candidatePassword, this.password);

    return match;
  } catch (error) {
    return error;
  }
};

export default connections.db.model<IUserModel>('UserModel', UserSchema);
