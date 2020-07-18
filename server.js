const express = require('express');
const { v4: uuidv4 } = require('uuid');

const db = {
  testimonials: [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'John Doek', text: 'This company is worth every coin! Haha' },
  { id: 4, author: 'Amanda Doek', text: 'They really know how to make you happy. lol' },
  ],
};

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;

  const data = {
    id: uuidv4(),
    author: author,
    text: text,
    message: 'OK'
  }
  res.json(data);
});

app.put('/testimonials/:id', (req, res) => {
  const {id, author, text} = req.body;

  res.json(db.testimonials.map( item => item.id == id && {...item, author: author, text: text, message: 'OK'}));
});

app.delete('/testimonials/:id', (req, res) => {

   res.json(db.testimonials.filter( item => item.id !== req.params.id) && {message: 'OK'});
});

app.use((req, res) => {
  res.status(404).json({message: '404 not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});