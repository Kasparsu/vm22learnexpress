const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
  store: new FileStore(),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({
  extended:true
}));

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use((req, res, next) => {
  env.addGlobal('user', req.session.user);
  env.addGlobal('errors', req.session.errors);
  req.session.errors = null;
  req.session.save();
  next();
});

app.get('/', (req, res) => {
  console.log(req.session.user);
  res.render('index.njk');
});

app.get('/page2', (req, res) => {
    res.render('page2.njk');
});

app.get('/form', (req, res) => {
  console.log(req.query);
  res.render('form.njk', req.query);
});

app.get('/circle', (req, res) => {
  res.render('circle.njk');
});

app.post('/circle', (req, res) => {
    let area = Math.PI * req.body.radius * req.body.radius;
    res.render('circleAnswer.njk', {r: req.body.radius, a: area});
});

const movieController = require('./src/movieController.js');
app.use('/movies', movieController);

app.get('/cookie', (req, res) => {
  res.cookie('mycookie', 'cool cookie', {maxAge: 1000*60*60*24*356*200});
  if(!req.session.secretValue){
    req.session.secretValue = new Date();
  }
  res.send(req.session);
});

const authController = require('./src/authController.js');
app.use(authController);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});