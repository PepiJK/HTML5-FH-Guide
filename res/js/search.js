$("#formSearch").submit(function (event) {
	var search = $(this).serialize();
	search = search.substring(7); // delete first 7 characters of string (delete "search=")
	//console.log("String Input: " + search);

	switch (search) {
		case "":
			alert("Suchfeld ist leer!!!");
			break;
		case "edva206":
			loadXml(search);
			break;
		case "edva207":
			loadXml(search);
			break;
		case "edva508":
			loadXml(search);
			break;
		case "edva608":
			loadXml(search);
			break;
		case "edva609":
			loadXml(search);
			break;
		case "edva610":
			loadXml(search);
			break;
		default:
			alert("Raum nicht vorhanden!!!");
	}

	event.preventDefault(); // prevent reloading page after hitting submit
	$(".queryResult").empty(); // delete previous searches from queryResult
});

function loadXml(str) {
	console.log(str)
	var date = document.getElementById("dateInput").value;
	data = date.split("-")
	var yf = parseInt(data[0]);
	var mf = parseInt(data[1]);
	var df = parseInt(data[2]);

	var time = document.getElementById("timeInput").value;
	time = time.split(":")
	var currentMin = parseInt(time[1]);
	var currentStd = parseInt(time[0]);

	document.getElementById("divOne").innerHTML = "";
	var request = new XMLHttpRequest();
	var f = "xml_json/" + str + ".xml"
	request.open("GET", f, false);
	request.send();
	var xml = request.responseXML;
	var daten = xml.getElementsByTagName("LVDaten");
	for (var i = 0; i < daten.length; i++) {

		var datum = daten[i].getElementsByTagName("Datum")[0].childNodes[0].nodeValue;
		datum = datum.split(".");
		var dx = parseInt(datum[0]);
		var mx = parseInt(datum[1]);
		var yx = parseInt(datum[2]);

		if (dx == df && mx == mf && yx == yf) {
			console.log("match1");
			var von = daten[i].getElementsByTagName("Von")[0].childNodes[0].nodeValue;
			von = von.split(":");

			var startStd = parseInt(von[0]);
			var startMin = parseInt(von[1]);

			var bis = daten[i].getElementsByTagName("Bis")[0].childNodes[0].nodeValue;
			bis = bis.split(":");
			var endStd = parseInt(bis[0]);
			var endMin = parseInt(bis[1]);

			
			console.log("startStd "+startStd+" startMin "+startMin+" endStd "+endStd+" endMin "+endMin);
			console.log("currentStd "+currentStd+"currentMin "+currentMin);

			if(  ((startStd==currentStd && startMin<currentMin)||startStd<currentStd) && ((endStd==currentStd && endMin>currentMin)||endStd>currentStd) )
			{
				console.log("match2");

				$("<h2/>", {
					class: "genaerated text-center",
					html: "Raum ist belegt"
				}).appendTo("#divOne");
				
				return;
			}


		}

	}
	
	$("<h2/>", {
		class: "genaerated text-center",
		html: "Keine Einträge gefunden"
	}).appendTo("#divOne");
}