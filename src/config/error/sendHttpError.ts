import { HttpError } from './index';
import { NextFunction, Request } from 'express';

export function sendHttpErrorModule(req: Request, res: any, next: NextFunction): void {
  res.sendHttpError = (error: HttpError): void => {
    res.status(error.status);

    if (req.xhr || req.is('json') || (req.is('json') && req.get('Accept')) || !(req.get('Accept') && req.get('Accept').indexOf('html') !== -1)) {
      res.json({
        status: error.status,
        name: error.name,
        message: error.message,
      });
    } else {
      res.send(generateHTML(error));
    }
  };

  next();
}

const generateHTML: Function = (error: HttpError): string => {
  if (error) {
    return "<div style='text-align: center;'>" + `<p>Status: ${error.status}</p>` + `<p>Name: ${error.name}</p>` + `<p>${error}</p>` + '</div>';
  }

  return '';
};
