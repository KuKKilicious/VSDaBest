var http = require('http');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Artikel = require('./Artikel');



//Mongoose Connection
mongoose.connect('mongodb://KuKKi:sehrsicher123@ds119788.mlab.com:19788/kukkivs'); 
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});


//Handle all request from server
const PORT=8082;



function handleRequest(request, response){
  response.end();
  
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
	saveObjectIntoDB(newArtikel);
}

//Creates new Article and calls saveObjectIntoDB
function newUser(asd,webj,asdhjk,qweuio,asdjklz){

	newUser = new User({
    name: "namevar",
	location: "P.O.B name32145123456",
    bdate: "birth date12121",
    favorit: "boolean",
    uid:0
  });
	saveObjectIntoDB(newUser);
}

//Saves incoming Object into DB, Void
function saveObjectIntoDB(Object){

console.log("saved: "+Object);
Object.save(function(error) {
    if (error) {
      console.error(error);
    }
    })
}

//Create and Start a server
//Must be at the end, first we create our handle functions and than we start the server
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});