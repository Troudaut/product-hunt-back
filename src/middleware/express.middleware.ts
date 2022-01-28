import express from 'express';

/**
 * A utiliser sur les routes de l'api pour récupérer les erreurs
 */
export const asyncMiddleware = fn => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    next(err);
  });
};
