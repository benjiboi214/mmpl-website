import { Request, Response } from 'express';

export const home = (req: Request, res: Response): void => {
  res.render('home', {
    headerTitle: 'MMPL | Home',
    header: 'Header',
  });
};
