//Instancie les dépendances du modele
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./users");



//Définit la structure des données pour le USER
var DailyStatsSchema = new mongoose.Schema({
    cold_call: {
      type: Number
    },
    rendez_vous: {
      type: Number
    },
    suivis: {
      type: Number
    },
    demandes_custom: {
      type: Number
    },
    contrats: {
      type: Number
    },
    closes_custom: {
      type: Number
    },
    closes_leo: {
      type: Number
    },
    author: 
    { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: String
    } 
  
    
  });



  var DailyStats = mongoose.model('DailyStats', DailyStatsSchema);
  module.exports = DailyStats;