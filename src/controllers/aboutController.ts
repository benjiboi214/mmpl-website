import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';

// About Page
const about = (req: Request, res: Response): void => {
  res.render(aboutConfig.reference, {
    metaTitle: aboutConfig.label,
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
    metaTitle: committeeConfig.label,
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

// World Rules Page
const world_rules = (req: Request, res: Response): void => {
  res.render(worldRulesConfig.reference, {
    metaTitle: worldRulesConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(worldRulesConfig.reference)
  });
};
const worldRulesConfig = {
  reference: 'world-rules',
  label: 'World Rules',
  href: 'world-rules/',
  parent: 'about',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: world_rules
};
SiteTree.registerPage(worldRulesConfig);

// Venues List Page
const venues = (req: Request, res: Response): void => {
  res.render(venuesConfig.reference, {
    metaTitle: venuesConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(venuesConfig.reference)
  });
};
const venuesConfig = {
  reference: 'venues',
  label: 'Venues',
  href: 'venues/',
  parent: 'about',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: venues
};
SiteTree.registerPage(venuesConfig);

// Honour Roll Page
const honourRoll = (req: Request, res: Response): void => {
  res.render(honourRollConfig.reference, {
    metaTitle: honourRollConfig.label,
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
