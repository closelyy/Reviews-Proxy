const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const Axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/reviews/:params', (req, res) => { 
  console.log(`Received ${req.method} request from ${req.url}`);
  console.log('extra parameters:      ', req.params);

  const apiUrl = 'http://localhost:3001' + req.url;
  console.log(apiUrl);
  request(apiUrl, (error, response, body) => { 
    if (!error && response.statusCode === 200) { 
      res.send(body); 
    } 
   }); 
});

app.post('/api/reviews/vote', (req, res) => { 
  console.log(`3001 Server:       Received ${req.method} request from ${req.url}`);
  const apiUrl = 'http://localhost:3001' + req.url;
  console.log(req.body);
  request({ 
    url: apiUrl,
    method: 'POST',
    form: req.body,
    headers: {
        'content-type': 'application/json',
    }
  }, (error, response, body) => { 
    console.log(body);
    res.send(body); 
  }); 
});

app.get('/Pictures/:filename', (req, res) => { 
  console.log(`Received ${req.method} request from ${req.url}`);
  const apiUrl = 'http://localhost:3001' + req.url;
  request.get(apiUrl).pipe(res);
});

app.get('/api/reservations/', (req, res) => {
  console.log(`${req.method} request from ${req.url}`);
  Axios.get('http://localhost:3003/api/reservations/')
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(200);
    });
});

app.get('/api/businesses/:businessId/photos', (req, res) => { 
  console.log(`Received ${req.method} request from ${req.url}`);
  const apiUrl = 'http://localhost:3002' + req.url;
  request.get(apiUrl).pipe(res);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
