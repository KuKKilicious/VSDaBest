// app/routes.js

var Artikel = require('./Artikel');




module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/',  function(req, res) {
    
        res.render('index.html'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('anmelden.html', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    
    
    

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('registrieren.html', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
 // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
    	
//    	console.log('Test: req.user= ' +req.user);
//    	console.log('Test: req.user.local.benutzername= ' +req.user.local.benutzername);
        
    	res.render('profile.html', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    
    
    
    
    
    
    
    //
    //
    //
  //AGB
  app.get('/agb',function(req,res){
  	 console.log("Got a GET request for the agb");
  	res.render('agb.html', { message: req.flash('signupMessage') });
  });

  //BenutzerdatenAnpassen
  app.get('/benutzerdatenAnpassen',function(req,res){
  	 console.log("Got a GET request for the benutzerdatenAnpassen");
  	res.render('benutzerdatenAnpassen.html', { message: req.flash('signupMessage') });
  });

  //BenutzerKonto
  app.get('/benutzerKonto',function(req,res){
  	 console.log("Got a GET request for the benutzerKonto");
  	res.render('benutzerKonto.html', { message: req.flash('signupMessage') });
  });


  
  
  
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //EigeneArtikel
  app.get('/eigeneArtikel', function(req,res){
	  
	  if (req.isAuthenticated()){
			var name = req.user.local.benutzername;
	//don't know how to get data out of arti		
  	var arti = findArtikelByBenutzername(name);
  	console.log('Test: arti= ' +arti);
  	console.log('Test: arti[1]= ' +arti[1]);
  	console.log('Test: arti.titel= ' +arti.titel);
//  	console.log("Got a GET request for the eigeneArtikel");
  	
  	res.render('eigeneArtikel.html', { user : req.user });
	  }else{
		  res.render('profile.html', { message: req.flash('signupMessage') });
	  }
  });


  //EingestellterArtikel
  app.get('/eingestellterArtikel',function(req,res){
  	console.log("Got a GET request for the eingestellterArtikel");
  	res.render('eingestellterArtikel.html', { message: req.flash('signupMessage') });
  });

  //ErfolgreichRegistriert
  app.get('/erfolgreichRegistriert',function(req,res){
  	console.log("Got a GET request for the erfolgreichRegistriert");
  	res.render('erfolgreichRegistriert.html', { message: req.flash('signupMessage') });
  });

  //Home
  app.get('/home',function(req,res){
  	 console.log("Got a GET request for the home");
  	res.render('home.html', { message: req.flash('signupMessage') });
  });

  //HomeVorLogin
  app.get('/homeVorLogin',function(req,res){
  	 console.log("Got a GET request for the homeVorLogin");
  	res.render('homeVorLogin.html', { message: req.flash('signupMessage') });
  });

  //Impressum
  app.get('/imprint',function(req,res){
  	 console.log("Got a GET request for the imprint");
  	res.render('imprint.html', { message: req.flash('signupMessage') });
  });

  //Neuen User anlegen
//  app.get('/neuAnmelden',function(req,res){
//  	 console.log("Got a GET request for the neuAmelden");
//  	 res.sendFile(path.join(__dirname, '../', 'neuAnmelden.html'));
//  	 newUser(req.params.anrede,req.params.vorname,req.params.nachname,req.params.Strasse,req.params.Hausnummer,req.params.Plz,req.params.Ort,req.params.Email,req.params.Benutzername,req.params.Passwort).save(function(err, doc){
//  		if(err) res.json(err);
//  		else res.send("User hinzugefügt");
//  	 });
//  });

  //NeuenArtikelEinstellen
  app.get('/neuenArtikelEinstellen',function(req,res){
  	 console.log("Got a GET request for the neuenArtikelEinstellen");
  	res.render('neuenArtikelEinstellen.html', { message: req.flash('signupMessage') });
  });





  //send the index.html as response to the user
  app.get('/index',function(req,res){
  	 console.log("Got a GET request for the indexpage");
  	res.render('home.html', { message: req.flash('signupMessage') });
  	 
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
  	    res.sendFile(path.join(__dirname, '../', 'home.html'));
  	  });
  	});
  
  //
  //
  //
    
    
    
 
    
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
     
}


//finds 1 Artikel in database by id
function findArtikelByBenutzername(name){
	var arr= Artikel.findOne({ benutzername: name}, function (err, doc){
		
		// doc is a the found element
		
		console.log('returning ' +doc);
	  	return doc;
	  	
		if (err) return handleError(err);
		});
	
	


//	console.log('arr.toString(): ' + arr.toString() );

	//console: 'arr: '[object Object]
	console.log('arr: ' + arr );
	return arr; 	

}


