var http = require('http');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Artikel = require('./Artikel');
var User = require('./User');
var fs = require("fs");
var express = require("express");
var app     = express();
var path    = require("path");

var bodyParser = require('body-parser');
var session = require('express-session');



//Mongoose Connection
mongoose.connect('mongodb://KuKKi:sehrsicher123@ds119788.mlab.com:19788/kukkivs'); 
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});


//Handle all request from server
const PORT=8084;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//session init
app.use(session({
    secret: 'test session',
    resave: false,
    saveUninitialized: true
}));

//save session
app.get('/setsession',function(req,res){
    sess=req.session;
    sess.sessdata = {};
    sess.sessdata.email= "beispiel";
    sess.sessdata.pass= "1234";
    var data = {
        "Data":""
    };
    sess.save(function(err) {
        if(err){
            data["Data"] = 'Error saving session';
            res.json(data);
            res.redirect('/homeVorLogin');
        }else{
            data["Data"] = 'Session saved successfully';
            res.json(data);
        }
    })
    console.log(req.session);
    res.end;
});


//logout - destroy session
app.get('/logout',function(req,res){
	req.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    res.redirect('/');
	  }
	});
});

app.get('/homeVorLogin',function(req,res){
	res.sendFile(path.join(__dirname, '../', 'homeVorLogin.html'));
	});





//just for testing.. no functionality
app.get('/',function(req,res){
	res.send('Hello World');
	});


//send the index.html as response to the user
app.get('/index',function(req,res){
	 console.log("Got a GET request for the indexpage");
	 res.sendFile(path.join(__dirname, '../', 'home.html'));
	 
});

app.get('/user/:id', function(req, res, next) {
	User.findById(req.params.id, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	    console.log("lala"+post +req.params.id);
	  });
	});

app.get('/user/new/:anrede/:vorname/:nachname/:Strasse/:Hausnummer/:Plz/:Ort/:Email/:Benutzername/:Passwort', function(req, res, next) {
	newUser(req.params.anrede,req.params.vorname,req.params.nachname,req.params.Strasse,req.params.Hausnummer,req.params.Plz,req.params.Ort,req.params.Email,req.params.Benutzername,req.params.Passwort, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	    console.log("lala" +req.params.Benutzername);
	    res.end
	  });
	});

//Home
app.get('/home',function(req,res){
	 console.log("Got a GET request for the home");
	 res.sendFile(path.join(__dirname, '../', 'home.html')); 
});
//AGB
app.get('/agb',function(req,res){
	 console.log("Got a GET request for the agb");
	 res.sendFile(path.join(__dirname, '../', 'agb.html')); 
});
//Impressum
app.get('/imprint',function(req,res){
	 console.log("Got a GET request for the impressum");
	 res.sendFile(path.join(__dirname, '../', 'imprint.html')); 
});

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
	