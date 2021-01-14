import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';


//Summer Champions
const summerChampions = (req: Request, res: Response): void => {
  res.render(summerChampConfig.reference, {
    metaTitle: summerChampConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(summerChampConfig.reference)
  });
};
const summerChampConfig = {
  reference: 'summer-champions',
  label: 'Summer Champions',
  href: 'summer-champions/',
  parent: 'history',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: summerChampions
};
SiteTree.registerPage(summerChampConfig);

// Summer Premier
const premierDivision = (req: Request, res: Response): void => {
  res.render(premierDivisionConfig.reference, {
    metaTitle: premierDivisionConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(premierDivisionConfig.reference)
  });
};
const premierDivisionConfig = {
  reference: 'summer-premier',
  label: 'Premier',
  href: 'premier/',
  parent: 'summer-champions',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: premierDivision
};
SiteTree.registerPage(premierDivisionConfig);

// Summer Div 1
const firstDivision = (req: Request, res: Response): void => {
  res.render(firstDivisionConfig.reference, {
    metaTitle: firstDivisionConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(firstDivisionConfig.reference)
  });
};
const firstDivisionConfig = {
  reference: 'summer-div-1',
  label: 'Division 1',
  href: 'div-1/',
  parent: 'summer-champions',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: firstDivision
};
SiteTree.registerPage(firstDivisionConfig);

// Summer Div 2
const secondDivision = (req: Request, res: Response): void => {
  res.render(secondDivisionConfig.reference, {
    metaTitle: secondDivisionConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(secondDivisionConfig.reference)
  });
};
const secondDivisionConfig = {
  reference: 'summer-div-2',
  label: 'Division 2',
  href: 'div-2/',
  parent: 'summer-champions',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: secondDivision
};
SiteTree.registerPage(secondDivisionConfig);
