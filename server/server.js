const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3005;
var cors = require('cors');
var request = require('superagent');
let content = require('./../src/content.json');

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.type('application/json');
  res.send({ express: 'Hello From Express' });
});

app.get('/getPlace/', (req,res) => {
   let placeId = req.query.palceId;
   request.get(content.getPlaceName+placeId)
          .then( (success) =>{
              res.setHeader("Content-Type", "application/json");
              res.send(success.text);
          });
});


app.get('/updatePlace/', (req,res) => {
   let placeName = req.query.placeName
   request.get(content.getPlace+placeName)
          .then( (success) =>{
              res.setHeader("Content-Type", "application/json");
              res.send(success.text);
          });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
