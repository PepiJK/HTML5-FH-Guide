
		//JSON-Datei laden, wenn zweiter Link geklickt wird
		$(document).ready(function () {
			loadRooms();
		});
		
		function loadRooms()
		{
			console.log("Load was performed.");
			$.getJSON("xml_json/rooms.json", function (data) {
				var heading;

				var items = [];
				//alle JSON-Daten als Key-Value auaslesen und als li-Elemente in Array speichern
				$.each(data, function (key, val) {
					heading = key;
					$.each(val, function (key, val) {
						items.push("<tr><td onclick=showData(this) onmouseover=style.color='grey' onmouseout=style.color='white' id='" + val + "'>" + val + "</td></tr>");
						//items.push("</tr>");
					});
				});

				//ul-Element erzeugen, als html werden alle li-Elemente hinzugefügt

				$("<h2/>", {
					class: "my-new-heading",
					html: heading
				}).appendTo("#divOne");

				$("<table/>", {
					class: "my-new-selection",
					html: items
				}).appendTo("#divOne");
			});

		}


		function showData(e)
		{
			document.getElementById("divTwo").innerHTML = "";
			var request = new XMLHttpRequest();
			var f = "xml_json/edva" + e.id[5] + e.id[7] + e.id[8] + ".xml"
			request.open("GET",f, false);
			request.send();
			var xml = request.responseXML;
			var daten = xml.getElementsByTagName("LVDaten");
			var items = [];
			items.push("<tr> <th>Datum</th> <th>Von</th> <th>Bis</th> <th>Lektoren</th> <th>Gruppen</th> <th>Lehrfach</th> <th>Anmerkung</th> <th>Stunde von</th> <th>Stunde bis</th> </tr>")
			for (var i = 0; i < daten.length; i++) {
				var datum = daten[i].getElementsByTagName("Datum")[0].childNodes[0].nodeValue;
				var von = daten[i].getElementsByTagName("Von")[0].childNodes[0].nodeValue.slice(0,5);
				var bis = daten[i].getElementsByTagName("Bis")[0].childNodes[0].nodeValue.slice(0,5);
				var lektoren = daten[i].getElementsByTagName("Lektoren")[0].childNodes[0].nodeValue;
				var gruppen = daten[i].getElementsByTagName("Gruppen")[0].childNodes[0].nodeValue;
				var lehrfach = daten[i].getElementsByTagName("Lehrfach")[0].childNodes[0].nodeValue;

				var anmerkung;
				if(daten[i].getElementsByTagName("Anmerkung")[0].childNodes.length>0)
					anmerkung=daten[i].getElementsByTagName("Anmerkung")[0].childNodes[0].nodeValue;
				else
					anmerkung="";

				var stundeVon = daten[i].getElementsByTagName("StundeVon")[0].childNodes[0].nodeValue;
				var stundeBis = daten[i].getElementsByTagName("StundeBis")[0].childNodes[0].nodeValue;
				items.push("<tr> <td>" + datum + "</td> <td>" + von + "</td> <td>" + bis + "</td><td>" + lektoren + "</td> <td>" + gruppen + "</td> <td>" + lehrfach + "</td> <td>" + anmerkung + "</td> <td>" + stundeVon + "</td> <td>" + stundeBis + "</td> </tr>")
			}
			
			$("<table/>", {
				class: "table table-dark",
				html: items
			}).appendTo("#divTwo");

		}

		function loadTimeTable()
		{

		}