var http = require('http');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Artikel = require('./js/Artikel');
var User = require('./js/userA');
var fs = require("fs");
var express = require("express");
var app     = express();
var path    = require("path");
var account = require('./js/account');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');


var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');



//Mongoose Connection
mongoose.connect('mongodb://KuKKi:sehrsicher123@ds119788.mlab.com:19788/kukkivs'); 
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});


//Handle all request from server
const PORT=8083;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/js/public'));

//
/*
 * 
 * 
 * 
 *///

require('./config/passport')(passport); // pass passport for configuration

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
//
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); // set up ejs for templating

//required for passport
app.use(session({ secret: 'shhh' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes ======================================================================
require('./js/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//
/*
 * 
 * 
 * 
 *///






//app.post('/', function(req, res) {
//    res.send('Username: ' + req.body.username);
//});



//test new User, Username=ID
//newUser('Herr', 'Anton', 'Kovalski', 'Bismarckstr','13','65349','Riedlingen','DaRudi69@Gmail.com','DaRudi8','verratichnicht');

//test to find user (success)
//findUserById("DaRudi2");




//finds 1 User in database by id and returns everything but password
function findUserById(id){

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
	arr[0]=user.titel;
	arr[1]=user.bschreibung;
	arr[2]=user.ort;
	arr[3]=user.plz;
	arr[4]=user.foto;
	arr[5]=user.benutzername;
	arr[6]=user._id;
	console.log('returning' +arr);
	
	return arr; 
	
	} );	
}

	
//Creates new Article and calls saveObjectIntoDB
function newArtikel(titel,beschreibung,ort,plz,foto,benutzername,id){

	newArtikel = new Artikel({
		titel: titel,
		beschreibung: beschreibung,
		ort: ort,
		plz: plz,
		foto: foto,
		benutzername: benutzername,
		_id : id
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




//--------------------------------------------------

//
//http.createServer(function(request, response) {	
//	
//	if(request.url === "/index"){
//		sendFileContent(response, "index.html", "text/html");
//	}
//	else if(request.url === "/"){
//		response.writeHead(200, {'Content-Type': 'text/html'});
//		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
//	}
//	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
//		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
//	}
//	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
//		sendFileContent(response, request.url.toString().substring(1), "text/css");
//	}
//	else{
//		console.log("Requested URL is: " + request.url);
//		response.end();
//	}
//}).listen(3000);

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}

//Create and Start a server
//Must be at the end, first we create our handle functions and than we start the server
var server = app.listen(PORT, function () {	   
	   console.log("Example app listening at http://%s", PORT)
	})
	