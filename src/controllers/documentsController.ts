import { Request, Response } from 'express';
import { DocumentStore } from '../utils/contentStore';
import documents from '../content/documents';

import { SiteTree } from '../utils/siteTree';

// Documents List Page
const documentList = (req: Request, res: Response): void => {
  res.render(documentsConfig.reference, {
    metaTitle: documentsConfig.label,
    breadcrumbs: SiteTree.getBreadcrumbs(documentsConfig.reference)
  });
};
const documentsConfig = {
  reference: 'documents',
  label: 'Documents',
  href: 'documents/',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true
  },
  pageController: documentList
};
SiteTree.registerPage(documentsConfig);

// Documents Detail Page
const documentDetail = (req: Request, res: Response): void => {
  // console.log(req.route);
  const pathArray = req.route.path.split('/');
  const reference = pathArray[pathArray.length - 2];

  const pageParams = SiteTree.getPage(reference);

  res.render('document-detail', {
    metaTitle: pageParams.label,
    breadcrumbs: SiteTree.getBreadcrumbs(reference),
    document: DocumentStore.getContent(reference)
  });
};

const baseDocumentConfig = {
  parent: 'documents',
  pageController: documentDetail
};
documents.forEach(document => {
  console.log(document);
  SiteTree.registerPage(Object.assign({}, baseDocumentConfig, document));
  DocumentStore.registerContent(document);
});
