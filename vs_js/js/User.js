var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var userschema = new mongoose.Schema({
	anrede: String,
	vorname: String,
	nachname: String,
	Strasse: String,
	Hausnummer: String,
	Plz: String,
	Ort: String,
	Email: String,
	Benutzername: String,
	Passwort: String,
	_id: String

})

module.exports = mongoose.model('User', userschema);

