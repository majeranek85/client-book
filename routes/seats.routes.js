const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/seats').get((req, res) => { res.json(db.seats) });

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const {day, seat, client, email} = req.body;

  if (!db.seats.some(item => item.day == day && item.seat == seat)) {
    const data = {
      id: uuidv4(),
      day: day,
      seat: seat,
      client: client,
      email: email,
      message: 'OK'
    };
    res.json(db.seats.push(data));
  } else {
    res.status(409).json({message: 'The slot is already taken'})
  };
});

router.route('/seats/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;

  res.json(db.seats.map( item => item.id == id &&
    {...item,
      day: day,
      seat: seat,
      client: client,
      email: email,
      message: 'OK'
    })
  );
});

router.route('/seats/:id').delete((req, res) => {
   res.json(db.seats.filter( item => item.id !== req.params.id) && {message: 'OK'});
});

module.exports = router;