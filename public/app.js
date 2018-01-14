function displayResults(scrapedData) {
    // First, empty the table
    $("#template").empty();

    // Then, for each entry of that json...
    scrapedData.forEach(function(info) {
        // Append each of the animal's properties to the table
        // $("#template").append("<div class='jumbotron'>" +
        //     "<h1>" + info.title + "</h1>" +
        //     "<p>" + info.summary + "</p>" +
        //     "<a href='gamespot.com" + info.link + "' target='_blank'>" + "URL Link" + "</a></div>");


        $("#template").append(

            
            "<div class='card' style='width: 68%;'>" +
            "<img class='card-img-top img-fluid' src='" + info.img + " ' alt='Card image cap' style='height: 15rem;'>" +
            "<div class='card-block'>" +
            "<h4 class='card-title'>" +
            info.title + "</h4>" +
            "<p class='card-text'>" +
            info.summary + "</p>" +
            "<a href='https://gamespot.com" + info.link + "' class='btn btn-primary'>" +
            "URL Link" + "</a>" +
            "</div>" +
            "</div>" 
        );





    });
}

$.getJSON("/all", function(data) {
    // Call our function to generate a table body
    displayResults(data);
});

$("#name-sort").on("click", function() {
  // Set new column as currently-sorted (active)
  setActive("#animal-name");

  // Do an api call to the back end for json with all animals sorted by name
  $.getJSON("/name", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
});
