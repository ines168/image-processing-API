import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import imageRoutes from './routes/images';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../images')));

const sessionConfig = {
  secret: 'xzy',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', imageRoutes);

// eslint-disable-next-line
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send('Something broke! Try again!');
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

export default app;
