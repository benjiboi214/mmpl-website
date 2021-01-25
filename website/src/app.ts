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

// Express Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);
app.use(function (req, res, next) {
  res.locals.referenceBase = {
    scheme: app.get('scheme'),
    host: app.get('host'),
    port: app.get('port')
  };
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
