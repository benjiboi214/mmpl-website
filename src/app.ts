import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Express Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);

// Primary Routes
app.get('/', (req: express.Request, res: express.Response): void => {
  res.render('home', {
      headerTitle: 'Title',
      header: 'Header'
  });
});

export default app;
