const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/concerts').get((req, res) => { res.json(db.concerts) });

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const {performer, genre, price, day, image} = req.body;

  const data = {
    id: uuidv4(),
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
    message: 'OK'
  }
  res.json(data);
});

router.route('/concerts/:id').put((req, res) => {
  const {id, performer, genre, price, day, image} = req.body;

  res.json(db.concerts.map( item => item.id == id &&
    {...item,
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
      message: 'OK'
    })
  );
});

router.route('/concerts/:id').delete((req, res) => {
   res.json(db.concerts.filter( item => item.id !== req.params.id) && {message: 'OK'});
});

module.exports = router;