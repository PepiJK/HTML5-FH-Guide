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

      var lvdaten = $(data).find("LVDaten");

      var timedate = new Date();
      var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; // needed because getMonth() only returns values 0-11
      var date = timedate.getDate() + "." + months[timedate.getMonth()] + "." + (timedate.getFullYear() - 1); // -1 because xml files are one year behind (2017 - 2018)
      var time = timedate.getHours() + ":" + timedate.getMinutes() + ":" + timedate.getSeconds();

      var used = false;

      date = "20.11.2017" // testing
      console.log(date);

      time = "11:30:10" // testing
      console.log(time);

      lvdaten.each(function () {

        if ($(this).find("Datum").text().match(date)) {

          var von = $(this).find("Von").text();
          var bis = $(this).find("Bis").text();

          if ((time > von) && (time < bis)) {
            console.log("Raum besetzt");
            $(".queryResult").append('<div class="alert alert-danger text-center font-weight-bold" role="alert">Raum ' + file + ' besetzt!</div>'); // Alert

            $(".queryResult").append('<h2 id="rauminfoheading" class="text-center py-3" >Rauminformationen zu ' + file + ' um ' + time + '</h2'); // Heading

            $(".queryResult").append('<table class="datatable table table-striped mx-auto"><tr><td>Datum</td><td>' + $(this).find("Datum").text() // Table
              + '</td></tr><tr><td>Von</td><td>' + $(this).find("Von").text()
              + '</td></tr><tr><td>Bis</td><td>' + $(this).find("Bis").text()
              + '</td></tr><tr><td>Lektoren</td><td>' + $(this).find("Lektoren").text()
              + '</td></tr><tr><td>Gruppen</td><td>' + $(this).find("Gruppen").text()
              + '</td></tr><tr><td>Lehrfach</td><td>' + $(this).find("Lehrfach").text()
              + '</td></tr><tr><td>Anmerkung</td><td>' + $(this).find("Anmerkung").text()
              + '</td></tr><tr><td>Stunde von</td><td>' + $(this).find("StundeVon").text()
              + '</td></tr><tr><td>Stunde bis</td><td>' + $(this).find("StundeBis").text()
              + '</td></tr></table>');

            used = true;
          }
        }
      });

      if (!used) {
        console.log("Raum frei");
        $(".queryResult").append('<div class="alert alert-success text-center font-weight-bold" role="alert">Raum ' + file + ' frei!</div>');
      }
    }
  });
}