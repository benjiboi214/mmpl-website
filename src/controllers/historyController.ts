import { Request, Response } from 'express';

import { SiteTree, PageProps } from '../utils/siteTree';
import { HistoryStore } from '../utils/historyStore';
import { baseWinterChampionDetailConfig, baseSummerChampionDetailConfig, historyControllerFactory } from '../utils/factories';

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
const winterChampConfig: PageProps = {
  reference: 'winter-champions',
  label: 'Winter Champions',
  href: 'winter-champions/',
  parent: 'history',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: null
};
winterChampConfig.pageController = historyControllerFactory(winterChampConfig);
SiteTree.registerPage(winterChampConfig);

winterHistory.forEach(history => {
  SiteTree.registerPage(Object.assign({}, baseWinterChampionDetailConfig, history));
  HistoryStore.registerContent(history);
});

//Summer Champions
const summerChampConfig: PageProps = {
  reference: 'summer-champions',
  label: 'Summer Champions',
  href: 'summer-champions/',
  parent: 'history',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: null
};
summerChampConfig.pageController = historyControllerFactory(summerChampConfig);
SiteTree.registerPage(summerChampConfig);

summerHistory.forEach(history => {
  SiteTree.registerPage(Object.assign({}, baseSummerChampionDetailConfig, history));
  HistoryStore.registerContent(history);
});
