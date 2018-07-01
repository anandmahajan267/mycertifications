const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const User = require('../models/user');

/* GET api listing. */

router.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/blogs', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

router.get('/blog/:id', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  var id = req.params.id;
  axios.get(`${API}/posts/${id}`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

router.get('/blog/:id/comments', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  var id = req.params.id;
  axios.get(`${API}/posts/${id}/comments`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

router.get('/users', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  User.find({}, (err, events) => {
    console.log(err);
    console.log(events);
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }
    else {
      res.status(200).json(events);
    }

    // return a view with data
    /*res.render('pages/events', {
      events: events,
      //success: req.flash('success')
    });*/
  });
});

router.get('/authlogin/:email/:pwd', (req, res) => {
  //console.log(req.params);
  var email = req.params.email;
  var password = req.params.pwd;
  User.findOne({ email: email }, (err, events) => {
    //console.log(err);
    //console.log(events);
    if (err) {
      res.status(404);
      res.json({ message: 'user not found!' });
    }
    else {
      if (events) {
        res.status(200).json({ message: 'ok', result: events });
      }
      else {
        res.status(404);
        res.json({ message: 'user not found!' });
      }
    }

  });
});

module.exports = router;