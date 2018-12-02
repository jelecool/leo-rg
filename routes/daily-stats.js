var express = require('express');
var router = express.Router();
var DailyStats = require('../models/daily-stats');

var bearerHeader;

function getDate() {
  let d = new Date();
  let f = d.toISOString();
  let a = f.split("T");
  let formatted = a[0];
  //console.log(`Moitié #1: ${a[0]} Moitié #2: ${a[1]}`);
  return formatted;
}


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
  //console.log(`ID Stored in SESSION : ${req.session.user._id}`);
  return res.render('daily_stats', {name: req.session.user.username, user: req.session.user });
 
});

/* GET home page. */
router.post('/', ensureToken, function(req, res, next){

  var daily_stats = {};
  console.log("Req.body.contrats: " + req.body.contrats);
  daily_stats.cold_call = req.body["cold-call"];
  daily_stats.rendez_vous = req.body["rendez-vous"];
  daily_stats.suivis = req.body["suivis"];
  daily_stats.contrats = req.body["contrats"];
  daily_stats.demandes_custom = req.body["demandes-custom"];
  daily_stats.closes_custom = req.body["closes-custom"];
  daily_stats.closes_leo = req.body["closes-leo"];
  daily_stats.author = req.session.user._id;
  daily_stats.date = getDate();



  DailyStats.create(daily_stats, function(err, stats) {
    if (err) {
      console.log(err);
    } else {
      console.log(stats);
    }
  })

  

  return res.redirect('/profile');
 
});

module.exports = router;
