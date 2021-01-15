import { Request, Response } from 'express';
import { SiteTree, PageProps } from './siteTree';
import { DocumentStore } from './contentStore';
import { HistoryStore } from './historyStore';


export const documentControllerFactory = (config: PageProps, viewName: string) => {
  return (req: Request, res: Response): void => {
    const pageParams = SiteTree.getPage(config.reference);
    const children = pageParams.children;
    const documents = children.map(reference => {
      const document = DocumentStore.getContent(reference);
      document.fullPath = SiteTree.getURLPath(reference);
      return document;
    });
    
    res.render(viewName, {
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

const championDetail = (req: Request, res: Response): void => {
  const pathArray = req.route.path.split('/');
  const reference = pathArray[pathArray.length - 2];
  const pageParams = SiteTree.getPage(reference);

  const historyHeaders = ['Season', 'Champions', 'Runners Up', 'MVP', 'MVP Team', 'Played', 'Lost', 'Won'];

  res.render('history-detail', {
    metaTitle: pageParams.label,
    breadcrumbs: SiteTree.getBreadcrumbs(reference),
    document: HistoryStore.getContent(reference),
    headers: historyHeaders
  });
};

export const baseWinterChampionDetailConfig = {
  parent: 'winter-champions',
  pageController: championDetail
};

export const baseSummerChampionDetailConfig = {
  parent: 'summer-champions',
  pageController: championDetail
};

const chunk = function<T>(chunkSize: number, array: Array<T>): Array<Array<T>>  {
  const R = [];
  for (let i = 0; i < array.length; i += chunkSize)
    R.push(array.slice(i, i + chunkSize));
  return R;
};

export const historyControllerFactory = (config: PageProps) => {
  return (req: Request, res: Response): void => {
    const pageParams = SiteTree.getPage(config.reference);
    const children = pageParams.children;
    const documents = children.map(reference => {
      const document = HistoryStore.getContent(reference);
      document.fullPath = SiteTree.getURLPath(reference);
      return document;
    });

    const splitArray = chunk(2, documents);

    res.render('champions', {
      metaTitle: config.label,
      breadcrumbs: SiteTree.getBreadcrumbs(config.reference),
      documents: splitArray
    });
  };
};
