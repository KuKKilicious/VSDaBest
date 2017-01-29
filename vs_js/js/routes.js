// app/routes.js
var Artikel = require('./Artikel');
var Nachricht = require('./Nachricht');



module.exports = function(app, passport) {

	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/',  function(req, res) {
    
  	  if (req.isAuthenticated()){
  		res.render('profile.html', { message: req.flash('signupMessage') });
  	 
  	  	}else{
        res.render('index.html')}; // load the index.ejs file
    });
    
    app.get('/index',  function(req, res) {
    	
     if (req.isAuthenticated()){
    	res.render('profile.html', { message: req.flash('signupMessage') });
    	  	 
    	}else{
         res.render('index.html')}; // load the index.ejs file
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


  
app.get('/benachrichtungen', function(req,res){
	  
	  if (req.isAuthenticated()){
			var name = req.user.local.benutzername;
			console.log('name  ' +name);
	//don't know how to get data out of arti		

			Nachricht.findOne({anbieter: name}, function (err, doc){
							
		// doc is a the found element
							
		console.log('returning ' +doc);
		res.render('benachrichtigungen.html', { user : doc });
		return doc;
		});
	 
	  	}else{
	  	res.render('index.html', { message: req.flash('signupMessage') });
	}
  });
  




  
  //EigeneArtikel
app.get('/eigeneArtikel', function(req,res){

	  if (req.isAuthenticated()){
			var name = req.user.local.benutzername;
			
	//don't know how to get data out of arti		

	Artikel.findOne({ benutzername: name}, function (err, doc){
							
		// doc is a the found element
		if(!doc){
		res.render('keineArtikel.html');
		
		}else{
		
		res.render('eigeneArtikel.html', { user : doc });
		return doc;
		}
		});
	 
	  	}else{
	  	res.render('index.html', { message: req.flash('signupMessage') });
	}
});

  
  
  //Suchergebnisse
  app.get('/suchergebnisse',  function(req, res) {
	 
	   
	  if (req.isAuthenticated()){
		  var name =  req.query.suche;
			var name1 = req.params.suche;
			
			// name and name1 are undefined -.-		
			console.log('suchergebnisse name: ' + name);
			console.log('suchergebnisse name1: ' + name1);
			
			Artikel.findOne({ titel: name}, function (err, doc){
									
			// doc is a the found element
			console.log('returning ' +doc);
			res.render('suchergebnisse.html', { user : doc });
			return doc;
			});
		
	 
	  	}else{
	  	res.render('index.html', { message: req.flash('signupMessage') });
	}
	  
	  
	  	
		 
  
  });

  
  
  
  
  
  //EingestellterArtikel
  app.get('/eingestellterArtikel',function(req,res){
  	console.log("Got a GET request for the eingestellterArtikel");
  	res.render('eingestellterArtikel.html', { message: req.flash('signupMessage') });
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

 

  //NeuenArtikelEinstellen
  app.get('/neuenArtikelEinstellen',function(req,res){
  	 console.log("Got a GET request for the neuenArtikelEinstellen");
     
	  if (req.isAuthenticated()){
		  res.render('neuenArtikelEinstellen.html', { message: req.flash('signupMessage') });
	  }else{
  	res.render('index.html', { message: req.flash('signupMessage') });
	  }
  });

  app.get('/randomStuff',function(req,res){
	  	 console.log("Got a GET request for randomStuff");
	  	res.render('randomStuff.html', { message: req.flash('signupMessage') });
	  });



  app.get('/user/:id', function(req, res, next) {
  	User.findById(req.params.id, function (err, post) {
  	    if (err) return next(err);
  	    res.json(post);
  	    console.log("lala"+post +req.params.id);
  	  });
  	});

  
  //
  //
  //
    
    
    
 /*
  app.use(bodyParser.urlencoded({
	    extended: true
	}));

	app.use(bodyParser.json());
*/
	app.post("/article/new", function (req, res) {
		 if (req.isAuthenticated()){
				var name = req.user.local.benutzername;
				var ort = req.user.local.Ort;
				var plz = req.user.local.Plz;
	    newArtikel= new Artikel();
	    
	    newArtikel.titel		= req.body.article.titel;
	    newArtikel.beschreibung	= req.body.article.beschreibung;
	    newArtikel.Ort			= ort
	    newArtikel.plz			= plz
	    newArtikel.foto			= req.body.article.foto;
	    newArtikel.benutzername = name
	    
	    	
	    	  newArtikel.save(function(err) {
	              if (err)
	                  throw err;
	          });
	    res.redirect('/../eigeneArtikel');
		 }else{
			 res.render('registrieren.html', { message: req.flash('signupMessage') });
			 
		 }
		 
		
	}); 
	
	
	
	app.get("/nachricht/new", function (req, res) {
		var interest = req.user.local.benutzername;
		newNachricht= new Nachricht();

		console.log('_______________________');
		//bisher getestet: req.local.titel , req.local, req.body.titel
		console.log('req.local.user.titel ' + req.params.titel);
		
		newNachricht.titel			= 	req.body.titel;
	    newNachricht.beschreibung	= 	req.body.beschreibung;
	    newNachricht.ort			= 	req.body.ort;
	    newNachricht.plz			= 	req.body.plz;
	    newNachricht.foto			= 	req.body.foto;
	    newNachricht.anbieter		= 	req.body.benutzername;
	    newNachricht.interessent	= 	interest;

	    
	    
//	    res.redirect('/../eigeneArtikel');
		
			
			 
		 
		 
		
	});  
	
	
};





// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
     
}




