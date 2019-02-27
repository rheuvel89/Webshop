var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'd@H7Tk$A3#9',
  database : 'sogyoadventures'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
	console.log('connected as id ' + connection.threadId);
  }
});

const express = require('express');
const app = express();
app.use(express.static('client'));
app.use(express.json());

connection.query("SELECT * FROM events", function (error, results, fields) {
	console.log("Results: " + JSON.stringify(results));
	console.log("Fields: " + fields[0]);
});

app.get("/api/attractions", (request, response) => {
    console.log("Api call received for /attractions");
    response.json(attractions)
})

app.post("/api/tickets", (request, response) => {
    console.log("Api call received for /placeorder");
    response.json(attractions)
})

app.post("/api/placeorder", (request, response) => {
    console.log("Api call received for /placeorder");
	console.log(request.body);
	for (e of request.body) {
		console.log("Length: " + request.body.length);
		var attraction = attractions.find(a => a.name === e.name);
		if (attraction && attraction.available > 0) {
			attraction.available -= 1;
		}
	}
    response.sendStatus(200);
});

app.get("/api/myorders", (request, response) => {
    console.log("Api call received for /myorders");
    response.sendStatus(200);
});

app.get("/api/admin/edit", (request, response) => {
    console.log("Api call received for /admin/edit");
    response.sendStatus(200);
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));

connection.end();