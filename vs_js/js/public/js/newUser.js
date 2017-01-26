	function myfunction(){
		console.log("hello1");
			
			 var anrede = document.getElementById("anrede").value;
			 var vorname = document.getElementById("vorname").value;
			 var nachname = document.getElementById("nachname").value;
			 var strasse = document.getElementById("strasse").value;
			 var hausNr = document.getElementById("hausNr").value;
			 var plz = document.getElementById("plz").value;
			 var ort = document.getElementById("ort").value;
			 var email = document.getElementById("email").value;
			 var benutzername = document.getElementById("benutzername").value;
			 var passwort = document.getElementById("passwort").value;
			 
			 $.get("/user/new/"+anrede+"/"+vorname+"/"+nachname+"/"+strasse+"/"+hausNr+"/"+plz+"/"+ort+"/"+email+"/"+benutzername+"/"+passwort);
			 
			return true;
		}
		
		function validateVorname(){
			if(document.getElementById("vorname").value.length < 3){
				alert("Der Vorname muss mindestens 3 Buchstaben lang sein!");
				return false;
			}
			else if(document.getElementById("vorname").value.indexOf("0") > -1 || document.getElementById("vorname").value.indexOf("1") > -1 || document.getElementById("vorname").value.indexOf("2") > -1 || document.getElementById("vorname").value.indexOf("3") > -1 || document.getElementById("vorname").value.indexOf("4") > -1 || document.getElementById("vorname").value.indexOf("5") > -1 || document.getElementById("vorname").value.indexOf("6") > -1 || document.getElementById("vorname").value.indexOf("7") > -1 || document.getElementById("vorname").value.indexOf("8") > -1 || document.getElementById("vorname").value.indexOf("9") > -1){
				alert("Der Vorname darf keine Zahlen beinhalten");
				return false;
			}
			return true;
		}
		
		function validateNachname(){
			if(document.getElementById("nachname").value.length < 3){
				alert("Der Nachname muss mindestens 3 Buchstaben lang sein!");
				return false;
			}
			else if(document.getElementById("nachname").value.indexOf("0") > -1 || document.getElementById("nachname").value.indexOf("1") > -1 || document.getElementById("nachname").value.indexOf("2") > -1 || document.getElementById("nachname").value.indexOf("3") > -1 || document.getElementById("nachname").value.indexOf("4") > -1 || document.getElementById("nachname").value.indexOf("5") > -1 || document.getElementById("nachname").value.indexOf("6") > -1 || document.getElementById("nachname").value.indexOf("7") > -1 || document.getElementById("nachname").value.indexOf("8") > -1 || document.getElementById("nachname").value.indexOf("9") > -1){
				alert("Der Nachname darf keine Zahlen beinhalten");
				return false;
			}
			return true;
		}
		
		function validateStrasse(){
			if(document.getElementById("strasse").value.length < 10){
				alert("Die Straße muss mindestens 10 Buchstaben lang sein!");
				return false;
			}
			else if(document.getElementById("strasse").value.indexOf("0") > -1 || document.getElementById("strasse").value.indexOf("1") > -1 || document.getElementById("strasse").value.indexOf("2") > -1 || document.getElementById("strasse").value.indexOf("3") > -1 || document.getElementById("strasse").value.indexOf("4") > -1 || document.getElementById("strasse").value.indexOf("5") > -1 || document.getElementById("strasse").value.indexOf("6") > -1 || document.getElementById("strasse").value.indexOf("7") > -1 || document.getElementById("strasse").value.indexOf("8") > -1 || document.getElementById("strasse").value.indexOf("9") > -1){
				alert("Die Straße darf keine Zahlen beinhalten");
				return false;
			}
			return true;
		}
		
		function validateHausNr(){
			if(document.getElementById("hausNr").value.length < 1){
				alert("Die HausNummer muss mindestens 1 Buchstabe lang sein!");
				return false;
			}
			return true;
		}
		
		function validatePlz(){
			if((document.getElementById("plz").value.length != 5) || (document.getElementById("plz").value.indexOf("0") > 0 || document.getElementById("plz").value.indexOf("1") > 0 || document.getElementById("plz").value.indexOf("2") > 0 || document.getElementById("plz").value.indexOf("3") > 0 || document.getElementById("plz").value.indexOf("4") > 0 || document.getElementById("plz").value.indexOf("5") > 0 || document.getElementById("plz").value.indexOf("6") > 0 || document.getElementById("plz").value.indexOf("7") > 0 || document.getElementById("plz").value.indexOf("8") > 0 || document.getElementById("plz").value.indexOf("9") > 0)){
				alert("Die PLZ besteht aus 5 Ziffern!");
				return false;
			}
			return true;
		}
		
		function validateOrt(){
			if(document.getElementById("ort").value.length < 3){
				alert("Der Ortsname muss mindestens 3 Buchstaben lang sein!");
				return false;
			}
			else if(document.getElementById("ort").value.indexOf("0") > -1 || document.getElementById("ort").value.indexOf("1") > -1 || document.getElementById("ort").value.indexOf("2") > -1 || document.getElementById("ort").value.indexOf("3") > -1 || document.getElementById("ort").value.indexOf("4") > -1 || document.getElementById("ort").value.indexOf("5") > -1 || document.getElementById("ort").value.indexOf("6") > -1 || document.getElementById("ort").value.indexOf("7") > -1 || document.getElementById("ort").value.indexOf("8") > -1 || document.getElementById("ort").value.indexOf("9") > -1){
				alert("Der ortsname darf keine Zahlen beinhalten");
				return false;
			}
			return true;
		}
		
		function validateEmail() {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(document.getElementById("email").value);
		}
		
		function validateBenutzername(){
			if(document.getElementById("benutzername").value.length < 7){
				alert("Der Benutzername muss mindestens 7 Buchstaben lang sein!");
				return false;
			}
			return true;
		}
		
		function validatePasswort(){
			if(document.getElementById("passwort").value.length < 8){
				alert("Das Passwort muss mindestens 8 Buchstaben lang sein!");
				return false;
			}
			else if(!(/\d/.test(document.getElementById("passwort").value))){
				alert("Das Passwort muss mindestens eine Ziffer enthalten");
				return false;
			}
			return true;
		}
		
		
		function getUrl(){
			alert("http://localhost:8084/neuAnmelden?anrede="+document.getElementById("anrede").value + "&vorname=" + document.getElementById("vorname").value + "&nachname=" + document.getElementById("nachname").value + "&Strasse=" + document.getElementById("strasse").value + "&Hausnummer=" + document.getElementById("hausNr").value + "&Plz=" + document.getElementById("plz").value + "&Ort=" + document.getElementById("ort").value + "&Email=" + document.getElementById("email").value + "&Passwort=" + document.getElementById("passwort").value);
			return "http://localhost:8084/neuAnmelden?vorname=" + vorname + "&nachname=" + nachname + "&Strasse=" + strasse + "&Hausnummer=" + hausnr +"&Plz=" + plz +"&Ort=" + ort + "&Email=" + email + "&user=" + benutzername + "&Passwort=" + passwort;
		}