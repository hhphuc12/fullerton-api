import * as express from 'express';
import * as http from 'http';
import * as auth from '@/config/middleware/auth';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import BookingRouter from './BookingRouter';
import EventTypeRouter from './EventTypeRouter';

type NextFunction = express.NextFunction;
type Request = express.Request;
type Response = express.Response;

export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  app.use('/auth', AuthRouter);
  app.use('/users', auth.isAuthenticated, UserRouter);
  app.use('/bookings', BookingRouter);
  app.use('/event-types', EventTypeRouter);

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  app.use(router);
}
