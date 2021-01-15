import { SiteTree } from './utils/siteTree';

import './controllers/homeController';
import './controllers/statsController';
import './controllers/documentsController';
import './controllers/historyController';
import './controllers/aboutController';
import './controllers/associationController';
import './controllers/joinController';

const v1Router = SiteTree.getExpressRouter();
console.log(v1Router);

export { v1Router as router };
