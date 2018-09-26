var port    = process.env.PORT || 3000,
    express = require("express"),
    request = require("request"),
    async = require("async"),
    app = express();

app.set("view engine", "ejs");


// Declaring path to API
var url = "https://oslobysykkel.no/api/v1/stations";

// API Identifier
// In the following code a enviroment variable has been used to store the API identifier. You can also comment this line, and un-comment the next line and enter the key identifier directly.
var identifier = process.env.identifierOsloBysykkel
//var identifier = "enterkeyhere";


var stations = {
    url: "https://oslobysykkel.no/api/v1/stations",
    headers: {
      'Client-Identifier': identifier
    }
  };

  var availability = {
    url: "https://oslobysykkel.no/api/v1/stations/availability",
    headers: {
      'Client-Identifier': identifier
    }
  };



  app.get("/", function(req, res) {
    function callback(error, response, body, cb) {
      if(error || response.statusCode != 200)
        return cb(true);
  
      cb(null, JSON.parse(body).stations);//instead of sending data directly to view, send it to async callback to merge it latter
    }
  
    var tasks = { // tasks to run in parallel
      stations: function (cb) {
        request(stations, function (error, response, body) {
          callback(error, response, body, cb);
        });
      },
      availability: function (cb) {
        request(availability, function (error, response, body) {
          callback(error, response, body, cb);
        });
      }
    };
  
    async.parallel(tasks, function (err, resp) {
      if(err) {
        //handle error here, the error could be caused by any of the tasks.
        return;
      }
      var availabilityIdMap = resp.availability.map(function (availability) { return availability.id; });//get an array of all the availability ids
      var data = resp.stations.map(function (station) { //merging station to corresponding availability object
        var availabilityIndex = availabilityIdMap.indexOf(station.id); // finding the availability against the station id.
        if(availabilityIndex < 0) //availability not found, just return station
          return station;
  
        var matchingAvailabilityObj = resp.availability[availabilityIndex]; //get the matching availability object
        var mergedObj = Object.assign(station, matchingAvailabilityObj); //merge both objects
        return mergedObj;
      });
  
      // now the data will have an array of merged object with properties from station and availability objects
      res.render("index", {data: data});
    });
  });
  
  
  app.listen(port, function(){
    console.log("Running");
  });