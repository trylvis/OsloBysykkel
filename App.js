var port    = process.env.PORT || 3000,
    express = require("express"),
    request = require("request"),
    app = express();

app.set("view engine", "ejs");


// Declaring path to API
var url = "https://oslobysykkel.no/api/v1/stations";

// API Identifier
// In the following code a enviroment variable has been used to store the API identifier. You can also comment this line, and un-comment the next line and enter the key identifier directly.
var identifier = process.env.identifierOsloBysykkel
//var identifier = "enterkeyhere";


app.get("/", function(req, res){
    var options = {
        url: url,
        headers: {
          'Client-Identifier': identifier
        }
      };

      function callback(error, response, body){
          if(!error && response.statusCode == 200){
              var info = JSON.parse(body);
              console.log(info)
          }
      }

    request(options, callback);
});


app.listen(port, function(){
    console.log("App has started and is listening on port " + port + "!");
});