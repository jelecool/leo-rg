var express = require('express');
var router = express.Router();
var Pipedrive = require('pipedrive');
var config = require('../config');
var pipedrive = new Pipedrive.Client(config.pipedrive_key, { strictMode: true });

var bearerHeader;


function ensureToken(req, res, next) {
  if (req.headers["authorization"]) {
    bearerHeader = req.headers["authorization"];
  } 
  
  if (req.session.token) {
    bearerheader = req.session.token;
  }
  //check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //get access token from string
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else if (typeof bearerheader !== 'undefined') {
      //get access token from string
      const bearerToken = bearerheader;
      req.token = bearerToken;
      next();

  } else {
    res.render('signin',{message: "NOT AUTHORIZED!"});
  }
}
 
/* GET home page. */
router.get('/', ensureToken, function(req, res, next){
  console.log(`ID Stored in SESSION : ${req.session.user._id}`);
  pipedrive.Users.get({id:3241853},function (err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log(users[12]);
    }
  })
  return res.render('profile', { name: req.session.user.username, user: req.session.user  });
 
});

module.exports = router;
