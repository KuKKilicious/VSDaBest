var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NachrichtSchema = new mongoose.Schema({
	titel: String,
	beschreibung: String,
	ort: String,
	plz: String,
	foto: String,
	anbieter: String,
	interessent: String
});

module.exports = mongoose.model('Nachricht', NachrichtSchema);