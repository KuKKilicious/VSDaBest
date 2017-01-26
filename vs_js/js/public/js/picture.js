var binary

function binaryToJpg(binary){
	var img = document.createElement('img');
	img.src = 'data:image/jpeg;base64,' + btoa('your-binary-data');
	document.body.appendChild(img);
	
	
}
function jpgToBase64(picture){
	var img = document.createElement('img');
	img.src = 'data:image/jpeg;base64,' + btoa('your-binary-data');
	document.body.appendChild(img);
	
	
}


File.prototype.convertToBase64 = function(callback){
    var reader = new FileReader();
    reader.onload = function(e) {
         callback(e.target.result)
    };
    reader.onerror = function(e) {
         callback(null);
    };        
    reader.readAsDataURL(this);
};

$("#picture").on('change',function(){
var selectedFile = this.files[0];
selectedFile.convertToBase64(function(base64){
   alert(base64);
}) 
});