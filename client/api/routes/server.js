var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
const { Console } = require('console');
var app = express();
//const url = require('url');
var http = require('http');

app.get("/", function(req, res){

console.log("A");
url = 'https://na.op.gg/summoner/userName=diamondyasu0main';


request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var GameType, Progress, userName;
    var json = { GameType : "", Progress : "", userName : ""};

    $('.TierRankInfo').filter(function(){
        var data = $(this);
        GameType = data.children().first().text();                   
        json.GameType = GameType;
    })

    $('.TierInfo').filter(function(){
      var data = $(this);
      Progress = data.children().first().text();            
      json.Progress = Progress;
  })

    $('.Profile').filter(function(){
        var data = $(this);
        userName = data.children().first().text();
        json.userName = userName;
    })
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');
})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send("Username : "  + json.userName  + "</br>" +  " GameType : " + json.GameType + "<br></br>" + "LP progress: " + json.Progress)
    }) ;
})

app.listen('8081')  
console.log('Magic happens on port 8081');
exports = module.exports = app;