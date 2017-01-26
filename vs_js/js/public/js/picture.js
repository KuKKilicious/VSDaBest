
/*
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

*/
   // you can do this once in a page, and this function will appear in all your files 
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

    $('#blah').on('change',function(){
      var selectedFile = this.files[0];
      selectedFile.convertToBase64(function(base64){
           alert(base64);
      }) 
    });
function readURL(input) {
	console.log("asdhjk");
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }