import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import app from '@/config/server/server';
import HttpError from '@/config/error';
import * as http from 'http';
import UserModel from '@/components/User/model';

interface RequestWithUser extends Request {
  user: object | string;
}

interface UserFromToken {
  id: string;
  email: string;
}

export async function isAuthenticated(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
  const token: any = req.headers.authorization;

  if (token && token.includes('Bearer ')) {
    try {
      const user: object | string = jwt.verify(token.split('Bearer ')[1], app.get('secret'));

      const userResult = await UserModel.findById((user as object as UserFromToken).id);
      req.user = userResult;

      return next();
    } catch (error) {
      return next(new HttpError(HttpStatus.UNAUTHORIZED, http.STATUS_CODES[HttpStatus.UNAUTHORIZED]));
    }
  }

  return next(new HttpError(HttpStatus.BAD_REQUEST, 'No token provided'));
}
