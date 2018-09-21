const express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/form', function(req, res){
	res.render('form');
});       

app.post('/postreq', (req, res) => {
  console.log('who get in here /postreq');

  // Set the headers
	var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
	}

	// Configure the request
	var options = {
    url: 'http://localhost:3000/' + req.body.server,
    method: 'POST',
    headers: headers,
    form: req.body	    
	}

	console.log(options);

	// Start the request
	request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      console.log(body);
      res.send(body);
    }
	});

	// res.send("sendpost to ");
});

app.get('/getreq/:id', (req, res) => {
  console.log('who get in here /getreq');
  var resp = "";
  // res.json(response);

  console.log(req.params.id);

	// Set the headers
	var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
	}

	// Configure the request
	var options = {
    url: 'http://localhost:3000/' + req.params.id,
    method: 'GET',
    headers: headers,
    // qs: {'key1': 'xxx', 'key2': 'yyy'}
	}

	// Start the request
	request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      // console.log(response);
      console.log(body);
      res.send(body);
    }
	})
	// res.send("send get to " + options.url);
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});


// const request = require('request');
 
// request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', 
// 	{ json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });