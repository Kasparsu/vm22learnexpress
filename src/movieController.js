const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', (req, res) => {
    if(!fs.existsSync('movies.json')){
        let json = {
            lastId: 0,
            movies: []
        };
        json = JSON.stringify(json);
        fs.writeFileSync('movies.json', json);
    }
    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    res.render('movies/index.njk',{movies: movies.movies});
});

router.get('/add', (req, res) => {
    res.render('movies/add.njk');
});

router.post('/add', (req, res) => {
    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    movies.movies.push({
        id: movies.lastId++,
        name: req.body.movie,
        year: req.body.year,
        description: req.body.description
    });
    let json = JSON.stringify(movies);
    fs.writeFileSync('movies.json', json);
    res.redirect('/movies/');
});

router.get('/view', (req, res) => {
    let id = parseInt(req.query.id);
    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    let movie = movies.movies.find( m => m.id === id);
    res.render('movies/view.njk', {movie: movie});
});

router.get('/edit/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    let movie = movies.movies.find( m => m.id === id);
    res.render('movies/edit.njk', {movie: movie});
});

router.post('/edit/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    let movie = movies.movies.find( m => m.id === id);
    movie.name = req.body.movie;
    movie.year = req.body.year;
    movie.description = req.body.description;
    let json = JSON.stringify(movies);
    fs.writeFileSync('movies.json', json);
    res.redirect('/movies/');
});

router.get('/delete/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    let index = movies.movies.findIndex( m => m.id === id);
    movies.movies.splice(index, 1);
    let json = JSON.stringify(movies);
    fs.writeFileSync('movies.json', json);
    res.redirect('/movies/');
});

module.exports = router;