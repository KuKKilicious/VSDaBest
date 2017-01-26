var mongoose    = require('mongoose');
var bcrypt   	= require('bcrypt-nodejs');
//var Schema      = mongoose.Schema;


var userschema = new mongoose.Schema({
	local            : {
    email        : String,
    password     : String,
   
	anrede: String,
	vorname: String,
	nachname: String,
	Strasse: String,
	Hausnummer: String,
	Plz: String,
	Ort: String,
	Email: String,

	
	_id: String
	 },
})


userschema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userschema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userschema);

