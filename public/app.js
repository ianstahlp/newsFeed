function displayResults(scrapedData) {
    // First, empty the table
    // $("#template").empty();

    // Then, for each entry of that json...
    scrapedData.forEach(function(info) {
        // Append each of the animal's properties to the table
        $("#template").append("<h3>" + info._id + "</h3>" +
            "<h1>" + info.title + "</h1>" +
            "<p>" + info.summary + "</p>" +
            "<a href='gamespot.com" + info.link + "'>" + "URL Link" + "</a>");
    });
}

$.getJSON("/all", function(data) {
    // Call our function to generate a table body
    displayResults(data);
});