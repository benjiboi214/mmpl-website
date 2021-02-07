import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { SiteTree } from './utils/siteTree';
import { router } from './routes';
import meta from './content/meta';
import socials from './content/socials';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');
app.set('scheme', process.env.SCHEME || 'http');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

let staticBase = '';
const cdnEnabled = process.env.CDN_ENABLED;
const cdnHost = process.env.CDN_HOST;
const cdnPath = process.env.CDN_PATH;

if (cdnEnabled && cdnHost && cdnPath) {
  staticBase = `https://${cdnHost}/${cdnPath}`;
} else {
  staticBase = `${app.get('scheme')}://app.get('host'):${app.get('port')}`;
}

// Express Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);
app.use(function (req, res, next) {
  res.locals.staticBase = staticBase;
  res.locals.headerMenu = SiteTree.getHeaderMenu();
  res.locals.footerMenu = SiteTree.getFooterMenu();
  res.locals.content = {
    meta,
    socials,
  };
  next();
});

// Primary Routes
app.use('', router);

export default app;
