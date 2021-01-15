import { Request, Response } from 'express';

import { SiteTree } from '../utils/siteTree';
import { HistoryStore } from '../utils/historyStore';
import { baseWinterChampionDetailConfig, baseSummerChampionDetailConfig } from '../utils/factories';

import { winterHistory, summerHistory } from '../content/history';

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

winterHistory.forEach(history => {
  SiteTree.registerPage(Object.assign({}, baseWinterChampionDetailConfig, history));
  HistoryStore.registerContent(history);
});

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

summerHistory.forEach(history => {
  SiteTree.registerPage(Object.assign({}, baseSummerChampionDetailConfig, history));
  HistoryStore.registerContent(history);
});
