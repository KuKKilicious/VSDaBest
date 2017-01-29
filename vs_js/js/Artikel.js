var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArtikelSchema = new mongoose.Schema({
	titel: String,
	beschreibung: String,
	ort: String,
	plz: String,
	foto: String,
	benutzername: String,
	
});

module.exports = mongoose.model('Artikel', ArtikelSchema);