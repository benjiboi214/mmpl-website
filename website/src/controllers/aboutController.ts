import { Request, Response } from 'express';

import { SiteTree, PageProps } from '../utils/siteTree';
import { DocumentStore } from '../utils/contentStore';
import {
  documentControllerFactory,
  baseDocumentDetailConfig,
} from '../utils/factories';

import associationDocs from '../content/association';
import aboutContent from '../content/about';
import worldRulesDocs from '../content/worldRules';

// About Page
const about = (req: Request, res: Response): void => {
  res.render(aboutConfig.reference, {
    metaTitle: aboutConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(aboutConfig.reference),
    about: aboutContent,
    sideBar: SiteTree.getDirectChildrenLinks(aboutConfig.reference),
  });
};
const aboutConfig = {
  reference: 'about',
  label: 'About',
  href: 'about/',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true,
  },
  pageController: about,
};
SiteTree.registerPage(aboutConfig);

// Comittee Page
const committee = (req: Request, res: Response): void => {
  res.render(committeeConfig.reference, {
    metaTitle: committeeConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(committeeConfig.reference),
    honourRoll: Object.assign(SiteTree.getPage(honourRollConfig.reference), {
      fullPath: SiteTree.getURLPath(honourRollConfig.reference),
    }),
  });
};
const committeeConfig = {
  reference: 'committee',
  label: 'Committee',
  href: 'committee/',
  parent: 'about',
  menuSettings: {
    header: true,
    footer: false,
  },
  pageController: committee,
};
SiteTree.registerPage(committeeConfig);

// Association Docs Pages
const documentsConfig: PageProps = {
  reference: 'association',
  label: 'Association',
  href: 'association/',
  parent: 'about',
  menuSettings: {
    header: true,
    footer: false,
  },
  pageController: null,
};
documentsConfig.pageController = documentControllerFactory(
  documentsConfig,
  'documents'
);
SiteTree.registerPage(documentsConfig);

// Register Documents
associationDocs.forEach((document) => {
  SiteTree.registerPage(Object.assign({}, baseDocumentDetailConfig, document));
  DocumentStore.registerContent(document);
});

// World Rules Docs Pages
const newWorldRulesConfig: PageProps = {
  reference: 'world-rules',
  label: 'World Rules',
  href: 'world-rules/',
  parent: 'about',
  menuSettings: {
    header: true,
    footer: false,
  },
  pageController: null,
};
newWorldRulesConfig.pageController = documentControllerFactory(
  newWorldRulesConfig,
  'documents'
);
SiteTree.registerPage(newWorldRulesConfig);

// Register World Rules Docs
worldRulesDocs.forEach((document) => {
  SiteTree.registerPage(Object.assign({}, baseDocumentDetailConfig, document));
  DocumentStore.registerContent(document);
});

// Honour Roll Page
const honourRoll = (req: Request, res: Response): void => {
  res.render(honourRollConfig.reference, {
    metaTitle: honourRollConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(honourRollConfig.reference),
  });
};
const honourRollConfig = {
  reference: 'honour-roll',
  label: 'Honour Roll',
  href: 'honour-roll/',
  parent: 'committee',
  menuSettings: {
    header: true,
    footer: false,
  },
  pageController: honourRoll,
};
SiteTree.registerPage(honourRollConfig);
