const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/page2', (req, res) => {
    res.render('page2.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});