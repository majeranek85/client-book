const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/testimonials').get((req, res) => { res.json(db.testimonials) });

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const {author, text} = req.body;

  const data = {
    id: uuidv4(),
    author: author,
    text: text,
    message: 'OK'
  }
  res.json(data);
});

router.route('/testimonials/:id').put((req, res) => {
  const {id, author, text} = req.body;

  res.json(db.testimonials.map( item => item.id == id && {...item, author: author, text: text, message: 'OK'}));
});

router.route('/testimonials/:id').delete((req, res) => {
   res.json(db.testimonials.filter( item => item.id !== req.params.id) && {message: 'OK'});
});

module.exports = router;