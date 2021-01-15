import { DocumentStore } from '../utils/contentStore';
import { SiteTree, PageProps } from '../utils/siteTree';
import { documentControllerFactory, baseDocumentDetailConfig } from '../utils/factories';

import associationDocs from '../content/association';

// Documents List Page
const documentsConfig: PageProps = {
  reference: 'association',
  label: 'Association',
  href: 'association/',
  parent: 'about',
  menuSettings: {
    header: true,
    footer: false
  },
  pageController: null
};
documentsConfig.pageController = documentControllerFactory(documentsConfig, 'documents');
SiteTree.registerPage(documentsConfig);

// Register Documents
associationDocs.forEach(document => {
  console.log(document);
  SiteTree.registerPage(Object.assign({}, baseDocumentDetailConfig, document));
  DocumentStore.registerContent(document);
});
