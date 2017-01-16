var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var userschema = new mongoose.Schema({
	anrede: String,
	vorname: String,
	nachname: String,
	Straße: String,
	Hausnummer: String,
	Plz: String,
	Ort: String,
	Email: String,
	Benutzername: String,
	Passwort: String

})

module.exports = mongoose.model('User', userschema);

