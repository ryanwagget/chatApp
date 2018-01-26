const express = require('express');
const app = express();

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html');
});

app.get('/contact', (req, res)=> {
  res.sendFile(__dirname + '/contact.html');
});

app.get('/portfolio', (req, res)=> {
  res.sendFile(__dirname + '/portfolio.html');
});

app.listen(3000, () => {
  console.log('listening to port 3000');
});
