require("dotenv").config();
var keys = require("keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];

// my-tweets command
if(command === "my-tweets") {
    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      }
    });
}

//spotify-this-song command
else if (command === "spotify-this-song") {
    if(process.argv[3]) {

    }
    //default to "The Sign" by Ace of Base if none entered
    else {
        
    }
}

//movie-this command
else if (command === "movie-this") {
    if(process.argv[3]) {

    }
    //default to "Mr. Nobody" if none entered
    else {
        
    }
}

//do-what-it-says command
else if (command === "do-what-it-says") {

}

else {
    console.log("Please enter a valid command: my-tweets, spotify-this-song, movie-this or do-what-it-says");
}