$(document).ready(function() {

  function getQuery() {

    $("#searchResults").html("");
    var searchURL = "https://en.wikipedia.org/w/api.php";
    var searchKeyWord = $("#searchBox").val();
    $.ajax({
      url: searchURL,
      dataType: 'jsonp',
      type: 'GET',

      data: {
        action: "query",
        format: "json",
        //parameters for generator
        generator: 'search',
        gsrsearch: searchKeyWord,
        gsrnamespace: 0,
        gsrlimit: 15,
        //parameters for article extracts
        prop: 'extracts',
        exchars: 200,
        exlimit: 'max',
        explaintext: true,
        exintro: true,
      },
      success: function(data) {
        //hone in on the data we want
        var searchList = data.query.pages;

        //used .each to iterate over objects and create title link and extract for html
        var simpleList = $.each(searchList, function(key, value) {
          $("#searchResults").append($("<a></a>").attr({
            href: 'http://en.wikipedia.org/wiki/' + value.title,
            target: "_blank",
            id: "resultLink"
          }).html($("<div></div>").attr("id", "resultBox").text(value.title).fadeIn(700)));

          $("#searchResults").append($("<p></p>").attr("id", "resultExtract").text(value.extract).fadeIn(1700));

        });
      }
    });
  }

  $("#test").click(function() {
    getQuery();
  })

  $("#searchBox").keydown(function(event) {
    //on Enter keydown
    if (event.which == 13) {
      getQuery();
    }

  });

});
