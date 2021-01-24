import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';

// External Reference to Stats
const statsConfig = {
  reference: 'stats',
  label: 'Stats',
  externalHref: 'https://poolstat.net.au/mmpl',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true
  }
};
SiteTree.registerPage(statsConfig);
