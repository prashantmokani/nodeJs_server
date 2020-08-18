var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express();

app.use(cors())

//Mysql Database Connection parameters
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port:3306,
  user: "root",
  password: "admin",
  database: 'hms'
});

//Connecting to mysql database
con.connect(function(err) {
    if (err) throw err;
    console.log(" Database Connected!");
  });

// create application/json parser
var jsonParser = bodyParser.json()



//POST Request for Hall Reservation Form.....
app.post('/api/hall/hallReservation',jsonParser,function(req,res){
    var jsondata = req.body;
    var values = [];

    values.push(
        jsondata.customerName,
        jsondata.phoneNumber,
        jsondata.emailId,
        jsondata.eventName,
        jsondata.bookingDate,
        jsondata.fromTime,
        jsondata.toTime,
        jsondata.noOfAttendees,
        jsondata.specialRequest,
    );

    console.log("inserting values in database for hall_reservation table ....")

    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)

    con.query('INSERT INTO hall_reservation (customer_name,phone_number,email_id,event_name,booking_date,from_time,to_time,no_of_attendees,special_request) VALUES (?)', [values], function(err,result) {
    if(err) {
        console.log(err);
        res.send('Error');
    }
    else {
        let response = 'Successfully Hall Reserved with Id: '+result.insertId;
        console.log(response)
        res.send(response);
    }
    });

});


//POST Request for Table Reservation
app.post('/api/table/tableReservation',jsonParser,function(req,res){
    var jsondata = req.body;
    var values = [];

    values.push(
        jsondata.customerName,
        jsondata.phoneNumber,
        jsondata.emailId,
        jsondata.bookingDate,
        jsondata.startTime,
        jsondata.noOfAttendees,
        jsondata.specialRequest,
    );

    console.log("inserting values in database for hall_reservation table ....")

    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)

    con.query('INSERT INTO table_reservation (customer_name,phone_number,email_id,booking_date,start_time,no_of_attendees,special_request) VALUES (?)', [values], function(err,result) {
    if(err) {
        console.log(err);
        res.send('Error');
    }
    else {
        let response = 'Successfully Table Reserved with Reference Id: '+result.insertId;
        console.log(response)
        res.send(response);
    }
    });

});





// Server Configurations.....

var server = app.listen(8080,function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Restaurant Server app is listening at http://%s:%s",host,port);
})