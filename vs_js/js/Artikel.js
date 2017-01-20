var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArtikelSchema = new mongoose.Schema({
	titel: String,
	beschreibung: String,
	ort: String,
	plz: String,
	foto: String,
<<<<<<< HEAD
	Benutzername: String,
=======
>>>>>>> branch 'master' of https://github.com/KuKKilicious/VSDaBest.git
	_id : String
});

module.exports = mongoose.model('Artikel', ArtikelSchema);