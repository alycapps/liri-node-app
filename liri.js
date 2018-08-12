require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require("request");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];

// my-tweets command
if(command === "my-tweets") {
    var params = {screen_name: 'joeatraleigh', count:20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        // console.log(tweets);
        // JSON.stringify(tweets, null, 2)
        for(var j=0; j<params.count; j++) {
            console.log(tweets[j].text);
            console.log(tweets[j].created_at);
            console.log("--------");
        }
      }
    });
}

//spotify-this-song command
else if (command === "spotify-this-song") {
    if(process.argv[3]) {
        var songName = "";
        for(var i=3; i<process.argv.length; i++) {
            songName = songName + process.argv[i];
        }
        spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log(data); 
        });
    }
    //default to "The Sign" by Ace of Base if none entered
    else {
        spotify.search({ type: 'track', query: 'The Sign', limit: 1}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log(data); 
        });
    }
}

//movie-this command
else if (command === "movie-this") {

    if(process.argv[3]) {
        var movieName = "";
        for(var m=3; m<process.argv.length; m++) {
            movieName = movieName + " " + process.argv[m];
        }
        console.log(movieName);
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                // console.log(result);
                console.log("Title of the Movie: " + result.Title);
                console.log("Release Year: " + result.Year);
                console.log("IMDB Rating: " + result.imdbRating);
                var RTRating = "";
                for (var r=0; r<result.Ratings.length; r++) {
                    if(result.Ratings[r].Source === "Rotten Tomatoes") {
                        RTRating = result.Ratings[r].Value;
                    }
                }
                console.log("Rotten Tomatoes Rating: " + RTRating);
                console.log("Country: " + result.Country);
                console.log("Language: " + result.Language);
                console.log("Plot: " + result.Plot);
                console.log("Actors: " + result.Actors);
            }
        });
    }
    //default to "Mr. Nobody" if none entered
    else {
        var movieName = "Mr. Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                // console.log(result);
                console.log("Title of the Movie: " + result.Title);
                console.log("Release Year: " + result.Year);
                console.log("IMDB Rating: " + result.imdbRating);
                var RTRating = "";
                for (var r=0; r<result.Ratings.length; r++) {
                    if(result.Ratings[r].Source === "Rotten Tomatoes") {
                        RTRating = result.Ratings[r].Value;
                    }
                }
                console.log("Rotten Tomatoes Rating: " + RTRating);
                console.log("Country: " + result.Country);
                console.log("Language: " + result.Language);
                console.log("Plot: " + result.Plot);
                console.log("Actors: " + result.Actors);
            }
        });
    }
}

//do-what-it-says command
else if (command === "do-what-it-says") {

}

else {
    console.log("Please enter a valid command: my-tweets, spotify-this-song, movie-this or do-what-it-says");
}