import { Request, Response } from 'express';

const about = (req: Request, res: Response): void => {
  res.render('about', {
    headerTitle: 'About',
    header: 'Header',
  });
};

const aboutCommittee = (req: Request, res: Response): void => {
  res.render('about', {
    headerTitle: 'Committee',
    header: 'Header',
  });
};

const aboutCommitteeHonourRoll = (req: Request, res: Response): void => {
  res.render('about', {
    headerTitle: 'Honour Roll',
    header: 'Header',
  });
};

export {
  about,
  aboutCommittee,
  aboutCommitteeHonourRoll
};
