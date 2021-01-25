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

/**
*
 * Home
 * - Sidebar = Upcoming Events
 * - Sidebar = Recent News
 * Events 
 * - Calendar
 *  - Pool Vic Calendar (Including PDF Export)
 * - Event List
 *  - Single Event ( AGM, Season Start, Presentation, ETC )
 * About
 * - Constitution
 * - World Rules
 * - Venues
 * Documentation
 * - Scoresheet
 * - Team Registration (Including Digital Submission)
 * - Player Registration (Including Digital Submission)
 * News / Announcements
 * - AGM 
 * - Season Kickoff
 * - Life Member Announcements
 * - 
 */
