$(document).ready(function () {
  var items = [];
  var subitems = [];

  $.ajax({
    type: "GET",
    url: "/res/xml_json/rooms.json",
    dataType: "json",
    success: function (data) {
      console.log("rooms.json has been successfully loaded");

      // Bauteil A
      $.each(data, function (objkey, objval) {
        items.push({ key: objkey, value: objval });
      });

      // Raum1, Raum2, ...
      $.each(items[0].value, function (objval, objkey) {
        subitems.push({ key: objkey, value: objval });
      });

      // Heading
      var headline = $('<h2 class="text-center pb-3">').appendTo("#alleAnzeigen");
      headline.append(items[0].key);

      // List
      $("#alleAnzeigen").append('<ul id="liste" class="text-center list-group mx-auto">');

      var list = $('ul#liste')
      var edv = ["edva206", "edva207", "edva508", "edva608", "edva609", "edva610"];

      $.each(subitems, function (i) {
        var li = $('<li/>')
          .addClass('list-group-item')
          .appendTo(list);
        var a = $('<a/>')
          .text(subitems[i].key)
          .attr('data', edv[i])
          //.attr('onclick', loadXml(edv[i]))
          .click(function () {
            $(".queryResult").empty(); // delete previous searches from queryResult
            loadXml(edv[i])
          })
          .appendTo(li);

        //console.log(subitems[i]);
      });
    }
  });
});
