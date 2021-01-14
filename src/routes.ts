import express from 'express';

import { SiteTree } from './utils/siteTree';

import './controllers/homeController';
import './controllers/statsController';
import './controllers/historyController';
import './controllers/winterHistoryController';
import './controllers/summerHistoryController';
import './controllers/aboutController';
import './controllers/joinController';

const v1Router = SiteTree.getExpressRouter();
console.log(SiteTree);

export { v1Router as router };

