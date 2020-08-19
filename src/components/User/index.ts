import UserService from './service';
import { HttpError } from '@/config/error';
import { IUserModel } from './model';
import { NextFunction, Request, Response } from 'express';

interface IRequestWithUser extends Request {
  user: IUserModel;
};

export async function find(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users: IUserModel[] = await UserService.find(req.params);

    res.status(200).json(users);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function getCurrent(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.findOne(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.insert(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.remove(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
