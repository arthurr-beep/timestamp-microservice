// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp", function (req, res) {
  const currDate = new Date();
  return res.json({
      unix: currDate.getTime(),
      utc: currDate.toUTCString()
  });
});

app.get("/api/timestamp/:str_date", function (req, res) {

    const { str_date } = req.params;
    let date_param;
    if(!str_date.includes('-')){
      date_param = new Date(str_date * 1000);
    }else{
       date_param = new Date(str_date);
    }
    
    if(date_param === null){
      return res.json({
       
        "error": "Invalid Date"

      });
    }else{
      return res.json({
        unix: date_param.getTime(),
        utc: date_param.toUTCString()
      });
    }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});