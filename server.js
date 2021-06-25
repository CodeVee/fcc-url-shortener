require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.use(bodyParser.urlencoded({extended: false}));

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const temp = {}

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;

  const regex = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
  
  if (!regex.test(url)) {
    res.json({error: 'invalid url'});
    return;
  }

  const req_url = new URL(url).hostname;

  dns.lookup(req_url, err => {
    if (err) return res.json({error:'Invalid hostname'})
    
    const found = Object.keys(temp).find(k => temp[k] === url);

    let key = '';
    if (found) {
      key = found;
    } 
    
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
