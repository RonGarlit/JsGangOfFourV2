
// Set up constants for required packages
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const chalk = require('chalk');  // Terminal string styling done right
const debug = require('debug')('app'); // A tiny JavaScript debugging utility
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const path = require('path'); // Node.JS path module

const port = process.env.PORT || 3000;  // Set the PORT for the application here
const app = express();  // Setup express as app for use here.
const open = require('open');  // Open stuff like URLs, files, executables. Cross-platform.

//app.use(morgan('combined'));  // setup morgan for http request reporting to terminal
app.use(morgan('tiny'));  // setup morgan for http request reporting to terminal


// Setup static files location served up by express
//app.use(express.static(path.join(__dirname, '/public/'))); 
app.use(express.static('public')) 
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/scripts', express.static(__dirname + 'public/scripts'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

// Setup EJS templeting view engine and view file location
app.set('views', './views');
app.set('view engine', 'ejs');


//======================================================
// Open the Server
//======================================================
app.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      // Display that we are running in terminal
      console.log('Node server running web application @ http://localhost:' + port);
      // Uncomment one of the following lines below to have it open a browser for testing automatically
        // open('http://localhost:' + port);
        //open('http://localhost:' + port);    // Open defualt browser  
      //open('http://localhost:' + port, {app: {name: 'firefox'}});  // Open in Firefox browser
      // open('http://localhost:' + port, {app: {name: 'chrome'}});  // Open in Chrome browser
    }
  });
  
  //======================================================
  // Root - Home Page
  //======================================================
  app.get('/', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('home');
  });
  //======================================================
  // About
  //======================================================
  app.get('/about', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('about');
  });
  
  app.get('/pageunderconstruction', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('pageunderconstruction');
  });
  //======================================================
  //======================================================
  // Design Pattern Routes
  //-------------------------
  // Creational Patterns
  //======================================================
  app.get('/AbstractFactory', function(req, res) {
    res.render('AbstractFactory');
  });
  
  app.get('/Builder', function(req, res) {
    res.render('Builder');
  });
  
  app.get('/FactoryMethod', function(req, res) {
    res.render('FactoryMethod');
  });
  
  app.get('/Prototype', function(req, res) {
    res.render('Prototype');
  });
  
  app.get('/Singleton', function(req, res) {
    res.render('Singleton');
  });
  //======================================================
  // Design Pattern Routes
  //-------------------------
  // Structural Patterns
  //======================================================
  app.get('/Adapter', function(req, res) {
    res.render('Adapter');
  });
  
  app.get('/Bridge', function(req, res) {
    res.render('Bridge');
  });
  
  app.get('/Composite', function(req, res) {
    res.render('Composite');
  });
  
  app.get('/Decorator', function(req, res) {
    res.render('Decorator');
  });
  
  app.get('/Facade', function(req, res) {
    res.render('Facade');
  });
  
  app.get('/Flyweight', function(req, res) {
    res.render('Flyweight');
  });
  
  app.get('/Proxy', function(req, res) {
    res.render('Proxy');
  });
  //======================================================
  // Design Pattern Routes
  //-------------------------
  // Behavioral Patterns
  //======================================================
  app.get('/Chain', function(req, res) {
    res.render('Chain');
  });
  
  app.get('/Command', function(req, res) {
    res.render('Command');
  });
  
  app.get('/Interpreter', function(req, res) {
    res.render('Interpreter');
  });
  
  app.get('/Iterator', function(req, res) {
    res.render('Iterator');
  });
  
  app.get('/Mediator', function(req, res) {
    res.render('Mediator');
  });
  
  app.get('/Memento', function(req, res) {
    res.render('Memento');
  });
  
  app.get('/Observer', function(req, res) {
    res.render('Observer');
  });
  
  app.get('/State', function(req, res) {
    res.render('State');
  });
  
  app.get('/Strategy', function(req, res) {
    res.render('Strategy');
  });
  
  app.get('/Template', function(req, res) {
    res.render('Template');
  });
  
  app.get('/Visitor', function(req, res) {
    res.render('Visitor');
  });
  //======================================================
  // Bootstrap Theme Routes
  //======================================================
  app.get('/bs', function(req, res) {
    res.render('bs');
  });
  
  app.get('/cerulean', function(req, res) {
    res.render('cerulean');
  });
  
  app.get('/cosmo', function(req, res) {
    res.render('cosmo');
  });
  
  app.get('/cyborg', function(req, res) {
    res.render('cyborg');
  });
  
  app.get('/darkly', function(req, res) {
    res.render('darkly');
  });
  
  app.get('/flatly', function(req, res) {
    res.render('flatly');
  });
  
  app.get('/journal', function(req, res) {
    res.render('journal');
  });
  
  app.get('/litera', function(req, res) {
    res.render('litera');
  });
  
  app.get('/lumen', function(req, res) {
    res.render('lumen');
  });
  
  app.get('/lux', function(req, res) {
    res.render('lux');
  });
  
  app.get('/materia', function(req, res) {
    res.render('materia');
  });
  
  app.get('/minty', function(req, res) {
    res.render('minty');
  });
  
  app.get('/pulse', function(req, res) {
    res.render('pulse');
  });
  
  app.get('/sandstone', function(req, res) {
    res.render('sandstone');
  });
  
  app.get('/simplex', function(req, res) {
    res.render('simplex');
  });
  
  app.get('/sketchy', function(req, res) {
    res.render('sketchy');
  });
  
  app.get('/slate', function(req, res) {
    res.render('slate');
  });
  
  app.get('/solar', function(req, res) {
    res.render('solar');
  });
  
  app.get('/spacelab', function(req, res) {
    res.render('spacelab');
  });
  
  app.get('/superhero', function(req, res) {
    res.render('superhero');
  });
  
  app.get('/united', function(req, res) {
    res.render('united');
  });
  
  app.get('/yeti', function(req, res) {
    res.render('yeti');
  });
  
  //======================================================
  
  
  
  
  