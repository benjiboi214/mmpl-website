import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';

// Winter Champs
const winterChampions = (req: Request, res: Response): void => {
  res.render(winterChampConfig.reference, {
    metaTitle: winterChampConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(winterChampConfig.reference)
  });
};
const winterChampConfig = {
  reference: 'winter-champions',
  label: 'Winter Champions',
  href: 'winter-champions/',
  parent: 'history',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: winterChampions
};
SiteTree.registerPage(winterChampConfig);

// Winter Premier
const premierDivision = (req: Request, res: Response): void => {
  res.render(premierDivisionConfig.reference, {
    metaTitle: premierDivisionConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(premierDivisionConfig.reference)
  });
};
const premierDivisionConfig = {
  reference: 'winter-premier',
  label: 'Premier',
  href: 'premier/',
  parent: 'winter-champions',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: premierDivision
};
SiteTree.registerPage(premierDivisionConfig);

// Winter Div 1
const firstDivision = (req: Request, res: Response): void => {
  res.render(firstDivisionConfig.reference, {
    metaTitle: firstDivisionConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(firstDivisionConfig.reference)
  });
};
const firstDivisionConfig = {
  reference: 'winter-div-1',
  label: 'Division 1',
  href: 'div-1/',
  parent: 'winter-champions',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: firstDivision
};
SiteTree.registerPage(firstDivisionConfig);

// Winter Div 2
const secondDivision = (req: Request, res: Response): void => {
  res.render(secondDivisionConfig.reference, {
    metaTitle: secondDivisionConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(secondDivisionConfig.reference)
  });
};
const secondDivisionConfig = {
  reference: 'winter-div-2',
  label: 'Division 2',
  href: 'div-2/',
  parent: 'winter-champions',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: secondDivision
};
SiteTree.registerPage(secondDivisionConfig);

// Winter Div 3
const thirdDivision = (req: Request, res: Response): void => {
  res.render(thirdDivisionConfig.reference, {
    metaTitle: thirdDivisionConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(thirdDivisionConfig.reference)
  });
};
const thirdDivisionConfig = {
  reference: 'winter-div-3',
  label: 'Division 3',
  href: 'div-3/',
  parent: 'winter-champions',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: thirdDivision
};
SiteTree.registerPage(thirdDivisionConfig);
