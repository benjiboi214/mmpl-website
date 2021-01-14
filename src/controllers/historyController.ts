import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';

// History Page
const history = (req: Request, res: Response): void => {
  res.render(historyConfig.reference, {
    metaTitle: 'History',
    breadcrumbs: SiteTree.getBreadcrumbs(historyConfig.reference)
  });
};
const historyConfig = {
  reference: 'history',
  label: 'History',
  href: 'history/',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true
  },
  pageController: history
};
SiteTree.registerPage(historyConfig);

