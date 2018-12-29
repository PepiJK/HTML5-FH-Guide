$("#formSearch").submit(function (event) {
	var search = $(this).serialize();
	search = search.substring(7); // delete first 7 characters of string (delete "search=")
	console.log("String Input: " + search);

	// Warum geht des ned ?
	/*
	if (search == ("edva206" || "edva207" || "edva508" || "edva608" || "edva609" || "edva610")) {
		alert("passt");
	*/

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
});

function loadXml(file) {
	var path = "/res/xml_json/" + file + ".xml";

	$.ajax({
		type: "GET",
		url: path,
		datatype: "xml",
		type: "get",
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("AJAX Error: " + errorThrown);
		},
		success: function (data) {
			console.log("AJAX Success: " + path);
			//console.log(data);
			$(data).find("LVDaten").each(function () {
				if ($(this).find("Datum").text().match("22.11.2017")) {
					$("#queryResult").append($(this));
					$("#queryResult").append("<br><br>");
					//console.log($(this).html());
					//var datum = $(this);
				}
			});

			//var datum = lvdaten.find("Datum").text();
			//console.log(datum);
		}
	});
}
