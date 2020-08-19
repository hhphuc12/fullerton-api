import BookingService from './service';
import { HttpError } from '@/config/error';
import { IBookingModel } from './model';
import { NextFunction, Request, Response } from 'express';
import { IUserModel, Permission } from '../User/model';

interface IRequestWithUser extends Request {
  user: IUserModel;
};

export async function find(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user } = req;
    const query = user.permission === Permission.ADMIN
      ? req.params
      : { ...req.params, userId: user._id }
    const bookings: IBookingModel[] = await BookingService.find(query);

    res.status(200).json(bookings);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const booking: IBookingModel = await BookingService.findOne(req.params.id);

    res.status(200).json(booking);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function create(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
  try {
    const booking: IBookingModel = await BookingService.insert({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(booking);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function update(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
  try {
    const booking: IBookingModel = await BookingService.update({
      ...req.body,
      _id: req.params.id
    });

    res.status(201).json(booking);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function remove(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, params } = req;

    // Verify if the booking belongs to user
    const bookingExist = await BookingService.find({
      _id: params.id,
      userId: user._id,
    });
    if (!bookingExist) {
      throw 'Forbidden!';
    }

    const booking: IBookingModel = await BookingService.remove(params.id);

    res.status(200).json(booking);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
