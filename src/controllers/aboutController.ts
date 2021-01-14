import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';

// About Page
const about = (req: Request, res: Response): void => {
  res.render(aboutConfig.reference, {
    metaTitle: 'About',
    breadcrumbs: SiteTree.getBreadcrumbs(aboutConfig.reference)
  });
};
const aboutConfig = {
  reference: 'about',
  label: 'About',
  href: 'about/',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true
  },
  pageController: about
};
SiteTree.registerPage(aboutConfig);

// Comittee Page
const committee = (req: Request, res: Response): void => {
  res.render(committeeConfig.reference, {
    metaTitle: 'Committee',
    breadcrumbs: SiteTree.getBreadcrumbs(committeeConfig.reference)
  });
};
const committeeConfig = {
  reference: 'committee',
  label: 'Committee',
  href: 'committee/',
  parent: 'about',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: committee
};
SiteTree.registerPage(committeeConfig);

// Honour Roll Page
const honourRoll = (req: Request, res: Response): void => {
  res.render(honourRollConfig.reference, {
    metaTitle: 'Honour Roll',
    breadcrumbs: SiteTree.getBreadcrumbs(honourRollConfig.reference)
  });
};
const honourRollConfig = {
  reference: 'honour-roll',
  label: 'Honour Roll',
  href: 'honour-roll/',
  parent: 'committee',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: honourRoll
};
SiteTree.registerPage(honourRollConfig);
