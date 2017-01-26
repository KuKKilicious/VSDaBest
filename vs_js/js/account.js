var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  
   	anrede		 : String,
	vorname		 : String,
	nachname	 : String,
	Strasse		 : String,
	Hausnummer	 : String,
	Plz			 : String,
	Ort			 : String,
	email		 : String,
	benutzername : String,
	password     : String,

});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
