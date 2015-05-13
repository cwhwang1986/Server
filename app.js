var express = require('express');
var bodyParser = require('body-parser');
var client = require('./twillio.js')
var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var resData, messages;
app.get('/',
	function(req, res, next){
	  client.messages('SMb916def588cd593d8ebb1d550f795199').get(function(err, message) { 
  	  messages = message;
  	  console.log("Message", message); 
    });
	  next();
  }, function(req, res){
	res.send("Testing Get Message: " + messages );}
);

app.post('/message', [
  function(req, res, next){  
    client.sendMessage({

	    to:'+16502242246', // Any number Twilio can deliver to
	    from: '+14155992671', // A number you bought from Twilio and can use for outbound communication
	    body: 'Testing message from Twillio.' // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio
         resData = responseData;
         console.log("responseData:", resData);
         next();
		})}, function(req, res){
    res.send('Message send to: ' + resData.to + "\nfrom: " + resData.from);
}]);

app.listen(port);
