const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Idea');
const Idea = mongoose.model('ideas');


router.get('/', (req, res) => {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      res.send({
        ideas
      })
    })
    .catch(err => {
      res.send({
        error: err,
      })
    })
});

router.post('/add', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({text:'Please add a title'});
  }

  if (!req.body.details) {
    errors.push({text:'Please add some details'});
  }

  if(errors.length > 0) {
    res.send(401, {
      errors: errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newIdea = {
      title: req.body.title,
      details: req.body.details,
    };
    new Idea(newIdea)
      .save()
      .then(() => {
        res.send(201, {
          newIdea
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get('/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.send(200, {
        idea
      });
    });
});

router.put('/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  })
    .then(idea => {
      idea.title = req.body.title;
      idea.details = req.body.details;

      idea.save()
        .then(() => {
          res.send(200, {
            idea
          })
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

router.delete('/:id', (req, res) => {
  Idea.remove({ _id: req.params.id })
    .then(() => {
      res.send(202);
    });
});

module.exports = router;