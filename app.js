
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
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Setup the Routers
const rootRouter = require('./routes/root');
const creationalRouter = require('./routes/creational');
const structuralRouter = require('./routes/structural');
const behavioralRouter = require('./routes/behavioral');
const bootstrapRouter = require('./routes/bootstrap');

// Setup EJS templeting view engine and view file location
app.set('views', './views');
app.set('view engine', 'ejs');

// Tell the app to use the routers for the application
app.use('/', rootRouter);
app.use('/', creationalRouter);
app.use('/', structuralRouter);
app.use('/', behavioralRouter);
app.use('/', bootstrapRouter);

//======================================================
// Open the Server
//======================================================
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    // Display that we are running in terminal
    console.log('Node server running web application @ http://localhost:' + port);
    // Uncomment one of the following lines below to have it open a browser for testing automatically
    // open('http://localhost:' + port);
    //open('http://localhost:' + port);    // Open defualt browser  
    //open('http://localhost:' + port, {app: {name: 'firefox'}});  // Open in Firefox browser
    //open('http://localhost:' + port, {app: {name: 'chrome'}});  // Open in Chrome browser
  }
});
  //======================================================




