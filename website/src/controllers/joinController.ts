import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';

// Join Page
const join = (req: Request, res: Response): void => {
  res.render(joinConfig.reference, {
    metaTitle: 'Join',
    breadcrumbs: SiteTree.getBreadcrumbs(joinConfig.reference)
  });
};
const joinConfig = {
  reference: 'join',
  label: 'Join',
  href: 'join/',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true
  },
  pageController: join
};
SiteTree.registerPage(joinConfig);
