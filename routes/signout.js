var express = require('express');  
var router = express.Router();


//Route qui écoutes la réception d'un login form et agit en conséquence (validation/création + envoie du token)
router.post('/', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
  });


module.exports = router;  