import { Request, Response } from 'express';
import { SiteTree, PageProps } from './siteTree';
import { DocumentStore } from './contentStore';

export const documentControllerFactory = (config: PageProps) => {
  return (req: Request, res: Response): void => {
    const pageParams = SiteTree.getPage(config.reference);
    const children = pageParams.children;
    const documents = children.map(reference => {
      const document = DocumentStore.getContent(reference);
      document.fullPath = SiteTree.getURLPath(reference);
      return document;
    });
  
    console.log(documents);
  
    res.render('documents', {
      metaTitle: config.label,
      breadcrumbs: SiteTree.getBreadcrumbs(config.reference),
      documents: documents
    });
  };
};

const documentDetail = (req: Request, res: Response): void => {
  const pathArray = req.route.path.split('/');
  const reference = pathArray[pathArray.length - 2];
  const pageParams = SiteTree.getPage(reference);

  res.render('document-detail', {
    metaTitle: pageParams.label,
    breadcrumbs: SiteTree.getBreadcrumbs(reference),
    document: DocumentStore.getContent(reference)
  });
};

export const baseDocumentDetailConfig = {
  parent: 'documents',
  pageController: documentDetail
};
