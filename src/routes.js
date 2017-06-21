var router = require('express').Router();
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var jwtDecode = require('jwt-decode');
var Goal = require('./models/goal.js');
var User = require('./models/user.js');

router.get('/goals', function(req, res) {
  var decoded = jwtDecode(req.headers['x-access-token']);
  Goal.findAllGoalsForUser(decoded[0].id)
  .then((goals) => {
    res.json(goals);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.post('/goals', function(req, res) {
  var decoded = jwtDecode(req.headers['x-access-token']);
  Goal.addNewGoal(decoded[0].id, req.body.name, req.body.description, req.body.complete, req.body.dueDate)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.post('/goals/:id', function(req, res) {
  Goal.markComplete(req.params.id);
})

router.get('/goals/:id', function(req,res) {
  Goal.findById(req.params.id)
  .then((goal) => {
    res.json(goal);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});


router.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findByUsername(username)
  .then((user, err) => {
    if (user.length > 0) {
      res.status(409).send('*Username already exists');
    } else {
      bcrypt.hash(password, 10, function(err, hash) {
        User.addNewUser(username, hash)
        .then((user) => {
          var token = jwt.encode(user, 'secret');
          res.json({token: token});
        })
      })
    }
  })
});

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findByUsername(username)
  .then((user, err) => {
    if (user.length === 0) {
      res.status(401).send('*Username not found');
    } else {
      bcrypt.compare(password, user[0].password, function(err, match) {
        if (match) {
          var token = jwt.encode(user, 'secret');
          res.json({token: token});
        } else {
          res.status(401).send('*Incorrect password');
        }
      });
    }
  })
});

module.exports = router;
