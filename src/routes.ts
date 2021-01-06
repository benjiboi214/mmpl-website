import express from 'express';

import { home } from './controllers/homeController';
import { about } from './controllers/aboutController';


const v1Router = express.Router();

// About
v1Router.get('/about', about);

// Home
v1Router.get('/', home);




export { v1Router as router };

