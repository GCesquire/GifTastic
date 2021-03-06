
$(document).ready(function() {

    var topics = ["The Beatles", "Prince", "The Rollingstones", "Drake", "Pink Floyd", "Kendrick Lamar", "David Bowie", "Beyonce", "Radiohead", "Kanye West"]
    var results;
    
    const renderButtons = () => {
    
        $("#artist-buttons").empty();
    
        for (i = 0; i < topics.length; i++) {
                
            var buttons = $("<button>");
    
            buttons.addClass("artist-btn");
            buttons.attr("data-name", topics[i]);
            buttons.text(topics[i]);
    
            $("#artist-buttons").append(buttons);
        };
    };
    
    $("#add-artist").on("click", function(event) {
    
        event.preventDefault();
    
        var artist = $("#artist-input").val().trim();
    
        topics.push(artist);
        $("#artist-input").val("");
    
        renderButtons();
    });
    
    renderButtons();
    
    function renderGifs() {
    
        var artistName = $(this).attr("data-name");
        var artistStr = artistName.split(" ").join("+");
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + artistStr + "&api_key=eCiQWQGBNpWpzziGALd34AbSezfF6EAe&limit=10";
    
        $.ajax({
        url: giphyURL,
        method: "GET"
        }).done(function(response) {
    
            results = response.data;
    
            $("#gifs").empty();
            
            for (var i = 0; i < results.length; i++) {   
                var artistDiv = $("<div>");
                var gifRating = $("<p class='rating'>").text("Rating: " + results[i].rating.toUpperCase());
                var artistImage = $("<img>");
    
                gifRating.addClass("rating-text")
                
                artistImage.addClass("image-gifs")
                artistImage.attr("src", results[i].images.fixed_height_still.url);
                artistImage.attr("data-state", "still");
                artistImage.attr("data-position", i);
    
                artistDiv.append(gifRating);
                artistDiv.append(artistImage);
                artistDiv.addClass("individual-gifs")
    
                $("#gifs").prepend(artistDiv);
            };
        });
    };
    
    $(document).on("click", ".artist-btn", renderGifs);
    
    function gifAnimation() {
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position");
        position = parseInt(position);

        if (state === "still") {
            $(this).attr("src", results[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", results[position].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
        }
    };
    $(document).on("click", ".image-gifs", gifAnimation);
});