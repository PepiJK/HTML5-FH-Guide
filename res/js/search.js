$("#formSearch").submit(function (event) {
	var search = $(this).serialize();
	search = search.substring(7); // delete first 7 characters of string (delete "search=")
	console.log("String Input: " + search);

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


