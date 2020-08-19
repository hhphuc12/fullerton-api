import * as HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import HttpError from '@/config/error';
import * as http from 'http';
import { Permission, IUserModel } from '@/components/User/model';

interface RequestWithUser extends Request {
  user: IUserModel;
}

export const isAdmin = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    if (!user || user.permission !== Permission.ADMIN) {
      throw 'Forbidden!';
    }

    return next();
  } catch (error) {
    return next(new HttpError(HttpStatus.FORBIDDEN, http.STATUS_CODES[HttpStatus.FORBIDDEN]));
  }
}

export const isUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    if (!user || user.permission !== Permission.USER) {
      throw 'Forbidden!';
    }

    return next();
  } catch (error) {
    return next(new HttpError(HttpStatus.FORBIDDEN, http.STATUS_CODES[HttpStatus.FORBIDDEN]));
  }
}
