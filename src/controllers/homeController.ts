import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';

// Home Page
const home = (req: Request, res: Response): void => {
  res.render(homeConfig.reference, {
    metaTitle: 'MMPL'
  });
};
const homeConfig = {
  reference: 'home',
  label: 'Home',
  href: '/',
  parent: SiteTree.rootLabel,
  menuSettings: {
    header: true,
    footer: true
  },
  pageController: home
};
SiteTree.registerPage(homeConfig);
