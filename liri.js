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
    var params = {screen_name: 'joeatraleigh', count:10 };
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
            movieName = movieName + process.argv[m];
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title of the Movie: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    }
    //default to "Mr. Nobody" if none entered
    else {
        var movieName = "Mr. Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body));
                console.log("Title of the Movie: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
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