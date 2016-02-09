var express = require('express');
var bodyParser = require('body-parser');
var session = require ('express-session');
var app = express();
var PORT = 3000;

//req = require (to ask), res = response (to get a response), next = to run next package or function in the chain
function myLoggingMiddleWare(req, res, next){
  var url = req.url;
  var method = req.method;

  console.log('%s request at %s', url, method); //, first %s is the url, second %s is the method. %s everytime a route is hit, it will print what url and method is being used, e.g., get or post
  next();
}

app.use(bodyParser.urlencoded({extended:false})); // .use is for using packages, this will parse the url requested by req
app.use(myLoggingMiddleWare);//this is a callback function, in a way this console.logs to the screen
app.use(session({ //this npm package creates a new session, this is for uniqueness when logging in and creating new session
  secret: 'my super secret', //this is a unique identifier, analogous to shas for commits, like a handshake, if there are any modifications, an error will be thrown
  cookie: {maxAge:6000 },//this means a new session will be created every 6 seconds
  resave: false,
  saveUninitialized: true // resave is when you want to keep the session, in most cases this is set to true, but in our case it's false for demo purposes//remember, after the last key in the object, the comma is not necessary
}));

app.get('/', function(req, res, next){
  if(sess.views) {
    sess.views++;
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '<p>');
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
    res.end();
  } else {
    sess.views = 1;
    res.end('welcome to the session example. refresh!');
  }
});

app.listen(PORT, function() {
  console.log("App is listening on PORT %s", PORT);// this is the same concept as line 12, except we're only getting 1 value, the PORT value
});
