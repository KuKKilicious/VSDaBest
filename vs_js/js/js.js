var artistName = "";
var artistPOB = "";
var artistDOB = "";
var artistFav = favButton(0); // empty star with 0 (1 === Full Star)
var index = 1;
var searchTerm = "";
var i = 0;
var j = 0;
var cells = [];
var rows = [];
var searchRows = [];
var sTable=0;
var rowCount=0;

function clearTable(){
	var resTable = document.getElementById("resTable");
resTable.innerHTML="";
	
}
function searchTable() {
	clearTable();
	
	searchTerm = document.getElementById("searchTerm").value;
	var table = document.getElementById("myTable");
	var resTable = document.getElementById("resTable");

	rows = table.rows;


	for (i = 1; i < rows.length; i++) {
		cells = rows[i];

		for (j = 1; j < 4; j++) {
			if (rows[i].cells[j].innerHTML == searchTerm) {
				
			
				addRow(rows[i].cells);
				break;

			}

		}
		
	}
	
	
	
	
	var row = resTable.insertRow(0);
	
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	
	cell1.innerHTML = "Index";
	cell2.innerHTML = "Name";
	cell3.innerHTML = "Place Of Birth";
	cell4.innerHTML = "Date Of Birth";
	cell5.innerHTML = "Favorite";
	sTable=1;
	
	
	
	
		//rowCount = resTable.rows.length;
		//var row = resTable.insertRow(rowCount);
		//console.log("42");
		//var rcell1 = row.insertCell(0);
		//var rcell2 = row.insertCell(1);
		//var rcell3 = row.insertCell(2);
		//var rcell4 = row.insertCell(3);
		//var rcell5 = row.insertCell(4);
		
		//rcell1.innerHTML = searchRows[i].cells[0].value;
		//rcell2.innerHTML = searchRows[i].cells[1].value;
		//rcell3.innerHTML = searchRows[i].cells[2].value;
		//rcell4.innerHTML = searchRows[i].cells[3].value;
		//rcell5.innerHTML = searchRows[i].cells[4].value;
		//console.log(searchRows[i]);
		console.log("test");
		//console.log(rcell1.innerHTML);
	
	
	
	
	//console.log(searchRows)
	searchRows = [];
}


function addRow(row){
	var resTable = document.getElementById("resTable");
	var row = row;
	
		rowCount = resTable.rows.length;
		var newRow = resTable.insertRow(rowCount);
		var rcell1 = newRow.insertCell(0);
		var rcell2 = newRow.insertCell(1);
		var rcell3 = newRow.insertCell(2);
		var rcell4 = newRow.insertCell(3);
		var rcell5 = newRow.insertCell(4);
		
		rcell1.innerHTML = row[0].innerHTML;
		rcell2.innerHTML = row[1].innerHTML;
		rcell3.innerHTML = row[2].innerHTML;
		rcell4.innerHTML = row[3].innerHTML;
		rcell5.innerHTML = row[4].innerHTML;
		
		console.log("test");
	
}

function favButton(b1) {

	if (b1 === 0) {
		return "<button onclick=\"switchThisButton(this)\" value=\"1\">&#9733</button>";
	}
	return "<button onclick=\"switchThisButton(this)\" value=\"0\">&#9734</button>";

};

function switchThisButton(button) {
	if (button.value == 1) {
		button.innerHTML = "&#9734";
		button.value = 0;

	} else {
		button.innerHTML = "&#9733";
		button.value = 1;
	}
}


function addArtist() {

	artistName = document.getElementById("addName");
	artistPOB = document.getElementById("addPOB");
	artistDOB = document.getElementById("addDOB");

	if (document.getElementById("addFav").checked) {
		artistFav = favButton(0);
	} else {
		artistFav = favButton(1);
	}

	var table = document.getElementById("myTable");
	rowCount = table.rows.length;

	var row = table.insertRow(rowCount);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);

	cell1.innerHTML = index;
	cell2.innerHTML = artistName.value;
	cell3.innerHTML = artistPOB.value;
	cell4.innerHTML = artistDOB.value;
	cell5.innerHTML = artistFav;

	index++;
};

function deleteArtist() {
};

