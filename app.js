const express = require('express');
const path = require('path');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();

const ideas = require('./routes/ideas');


mongoose.connect(database.mongoURI)
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ideas', ideas);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
