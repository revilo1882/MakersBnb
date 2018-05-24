const db = require("./server/models/index.js").Properties;
var express = require("express")
var session = require('express-session')
var app = express()

app.use(session());

app.use(express.urlencoded());

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', async function(req, res) {
  listings = []
  name = req.body.username;
  console.log(name);
  await db.findAll()
  .then(spaces => { spaces.forEach(function (space) {
    listings.push(space.dataValues);
   })
 });
 res.render('index')
});

app.get('/users/new', function(req, res) {
  res.render('signup')
});

app.post('/users', function(req, res) {
  res.redirect('/')
});

app.get('/sessions/new', function(req, res) {
  res.render('login')
});

app.post('/sessions', function(req, res) {
  console.log(req.body);
  res.redirect('/')
});

app.listen(3000, function() {
  console.log('Server is up!')
});

app.post('/listing', async function(req, res) {
  await db.create({
    name: req.body.title,
    description: req.body.description,
    price: req.body.price,
    contact: req.body.contact,
  });
    res.redirect('/')

});


module.exports = app;
