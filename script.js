$(document).ready(function() {

    // Start your code from here
    var characters = ["Gus Fring", "Saul Goodman", "Kim Wexler", "Mike Ehrmantraut", "Lalo Salamanca", "Nacho Varga",
        "Howard Hamlin", "Chuck McGill", "Hector Salamanca", "Huel Babineaux"
    ];

    function populateButtons(array) {
        $("#animal-buttons").empty();

        array.forEach(element => {
            var a = $("<button>");
            a.text(element)
            a.addClass("animal-button")
            a.attr("data-type", element)
            $("#animal-buttons").append(a);
        });
    }

    $("#animal-buttons").on("click", ".animal-button", function() {

        $("#animals").empty();

        // search term
        var type = $(this).attr("data-type");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=7OIQrr1lH7D2bfR6gYgeaVOTWP29iGxx";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                response.data.forEach(gif => {

                    var animalDiv = $(`<div class='animal-item'>`);
                    var rating = gif.rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var animated = gif.images.fixed_height.url;
                    var still = gif.images.fixed_height_still.url;

                    var animalImage = $("<img>");
                    animalImage.attr("src", still);
                    animalImage.attr("data-still", still);
                    animalImage.attr("data-animate", animated);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("animal-image");

                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $("#animals").append(animalDiv);
                })
            })
    })

    $("#animals").on("click", ".animal-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still");
        }
    })

    $("#add-animal").on("click", function(e) {

        e.preventDefault();
        var newItem = $("input").val();
        characters.push(newItem);
        populateButtons(characters);
    })

    populateButtons(characters);
});
