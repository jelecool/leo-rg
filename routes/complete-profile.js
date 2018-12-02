var express = require('express');
var router = express.Router();
var User = require('../models/users');

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
 
router.get('/', ensureToken, function(req, res, next) {
  return res.render('complete_profile');
});

/* GET home page. */
router.post('/', ensureToken, function(req, res, next){

  var full_profile = {};

  full_profile.firstname = req.body.firstname;
  full_profile.lastname = req.body.lastname;
  full_profile.pipedrive_email = req.body.pipedrive_email;
  full_profile.pipedrive_password = req.body.pipedrive_password;



  User.findOneAndUpdate({id: req.session.user._id},full_profile, function(err, stats) {
    if (err) {
      console.log(err);
    } else {
      console.log(stats);
    }
  })

  

  return res.redirect('/profile');
 
});

module.exports = router;
