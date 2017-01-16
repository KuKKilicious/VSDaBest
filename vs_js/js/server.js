var http = require('http');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Artikel = require('./Artikel');
var User = require('./User');



//Mongoose Connection
mongoose.connect('mongodb://KuKKi:sehrsicher123@ds119788.mlab.com:19788/kukkivs'); 
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});


//Handle all request from server
const PORT=8083;



function handleRequest(request, response){
  response.end();
  
}

//test new User, Username=ID
//newUser('Herr', 'Martin', 'Kovalski', 'Bismarckstr','13','65349','Riedlingen','DaRudi69@Gmail.com','DaRudi','verratichnicht');

//test to find user (success)
findUserByID("DaRudi");




//finds 1 User in database by id and returns everything but password
function findUserByID(id){
	

	User.findById(id, function (err, user) { 
		if (err) return handleError(err);
	
	var arr=[];
	
	arr[0]=user.anrede;
	arr[1]=user.vorname;
	arr[2]=user.nachname;
	arr[3]=user.Strasse;
	arr[4]=user.Hausnummer
	arr[5]=user.Plz
	arr[6]=user.Ort
	arr[7]=user.Email
	arr[8]=user.Benutzername;
	console.log('returning ' +arr);
	
	
	return arr; 
	
	
	} );
	

}

//finds 1 Artikel in database by id
function findArtikelByID(id){
	

	User.findById(id, function (err, user) { 
		if (err) return handleError(err);
	
	var arr=[];
	
	arr[0]=user.anrede;
	arr[1]=user.vorname;
	arr[2]=user.nachname;
	arr[3]=user.Strasse;
	arr[4]=user.Hausnummer
	arr[5]=user.Plz
	arr[6]=user.Ort
	arr[7]=user.Email
	arr[8]=user.Benutzername;
	console.log('returning' +arr);
	
	
	return arr; 
	
	
	} );
	

}

	
//Creates new Article and calls saveObjectIntoDB
function newArtikel(asd,webj,asdhjk,qweuio,asdjklz){

	newArtikel = new Artikel({
    name: "namevar",
	location: "P.O.B name32145123456",
    bdate: "birth date12121",
    favorit: "boolean",
    uid:0
  });
	if(!saveObjectIntoDB(newUser)){
	saveObjectIntoDB(newArtikel);
	return false;
	}
	return true;
}

//Creates new User and calls saveObjectIntoDB
function newUser(anrede,vorname,nachname,Strasse,Hausnummer,Plz,Ort,Email,Benutzername,Passwort){

	newUser = new User({
		anrede: anrede,
		vorname: vorname,
		nachname: nachname,
		Strasse: Strasse,
		Hausnummer: Hausnummer,
		Plz: Plz,
		Ort: Ort,
		Email: Email,
		Benutzername: Benutzername,
		Passwort: Passwort,
		_id: Benutzername
  });
	if(!saveObjectIntoDB(newUser)){
		return false;
	}
	return true;
}

//Saves incoming Object into DB, Void
function saveObjectIntoDB(Object){

console.log("saved: "+Object);
Object.save(function(error) {
    if (error) {
      console.error(error);
      return false;
    }
    })
    return true;
    
}

//Create and Start a server
//Must be at the end, first we create our handle functions and than we start the server
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});