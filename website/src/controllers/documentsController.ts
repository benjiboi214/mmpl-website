import { DocumentStore } from '../utils/contentStore';
import { SiteTree, PageProps } from '../utils/siteTree';
import { documentControllerFactory, baseDocumentDetailConfig } from '../utils/factories';

import documents from '../content/documents';


// Documents List Page
const documentsConfig: PageProps = {
  reference: 'documents',
  label: 'Documents',
  href: 'documents/',
  parent: 'home',
  menuSettings: {
    header: true,
    footer: true
  },
  pageController: null
};
documentsConfig.pageController = documentControllerFactory(documentsConfig, 'documents');
SiteTree.registerPage(documentsConfig);

// Register Documents
documents.forEach(document => {
  SiteTree.registerPage(Object.assign({}, baseDocumentDetailConfig, document));
  DocumentStore.registerContent(document);
});
