import EventTypeService from './service';
import { HttpError } from '@/config/error';
import { IEventTypeModel } from './model';
import { NextFunction, Request, Response } from 'express';

export async function find(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const eventTypes: IEventTypeModel[] = await EventTypeService.find(req.params);

    res.status(200).json(eventTypes);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const eventType: IEventTypeModel = await EventTypeService.findOne(req.params.id);

    res.status(200).json(eventType);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const eventType: IEventTypeModel = await EventTypeService.insert(req.body);

    res.status(201).json(eventType);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const eventType: IEventTypeModel = await EventTypeService.remove(req.params.id);

    res.status(200).json(eventType);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
