const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/:params', (req, res) => { 
  console.log(`Received ${req.method} request from ${req.url}`);
  console.log('extra parameters:      ', req.params);

  const apiUrl = 'http://localhost:3000' + req.url;
  console.log(apiUrl);
  request(apiUrl, (error, response, body) => { 
    if (!error && response.statusCode === 200) { 
      res.send(body); 
    } 
   }); 
});

app.get('/api/reviews/:params', (req, res) => { 
  console.log(`Received ${req.method} request from ${req.url}`);
  console.log('extra parameters:      ', req.params);

  const apiUrl = 'http://localhost:3000' + req.url;
  console.log(apiUrl);
  request(apiUrl, (error, response, body) => { 
    if (!error && response.statusCode === 200) { 
      res.send(body); 
    } 
   }); 
});

app.post('/api/reviews/vote', (req, res) => { 
  console.log(`3001 Server:       Received ${req.method} request from ${req.url}`);
  const apiUrl = 'http://localhost:3000' + req.url;
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
  const apiUrl = 'http://localhost:3000' + req.url;
  request.get(apiUrl).pipe(res); 
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
