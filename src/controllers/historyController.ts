import { SiteTree, PageProps } from '../utils/siteTree';
import { DocumentStore } from '../utils/contentStore';
import { HistoryStore } from '../utils/historyStore';
import { baseWinterChampionDetailConfig, baseSummerChampionDetailConfig, historyControllerFactory, documentControllerFactory } from '../utils/factories';

import { winterHistory, summerHistory, historyDir } from '../content/history';

// History Page
const historyConfig: PageProps = {
  reference: 'history',
  label: 'History',
  href: 'history/',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true
  },
  pageController: null
};
historyConfig.pageController = documentControllerFactory(historyConfig, 'history');
SiteTree.registerPage(historyConfig);
historyDir.forEach(document => {
  DocumentStore.registerContent(document);
});

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
