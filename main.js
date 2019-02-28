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

app.get("/api/attractions", (request, response) => {
	console.log("Api call received for /attractions");
	connection.query("SELECT * FROM standard", function (error, results, fields) {
		response.json(results)
	});
})

app.post("/api/tickets", (request, response) => {
    console.log("Api call received for /tickets");
    //response.json(attractions)
	response.sendStatus(418);
})

app.post("/api/placeorder", (request, response) => {
    console.log("Api call received for /placeorder");
	for (e of request.body) {
		//var sql = 'START TRANSACTION; SELECT @ticket := eventId FROM events WHERE name = ?; SELECT @discountId := discountId, @ticketId := ticketId FROM tickets WHERE eventId = @eventId; SELECT @available := available FROM discounts WHERE discountId = @discountId; UPDATE discounts SET available = @available - 1 WHERE discountId = @discountId; INSERT INTO orders (customerId, ticketId, adultAmount, kidsAmount) VALUES (1, @ticketId, ?, ?); COMMIT;';
		var sql = `CALL orderTicket(?,?,?)`;
		connection.query(sql, [e.name, e.adults, e.kids], function (error, results, fields) {
			console.log(error);
		});
	}
    response.sendStatus(200);
});

app.get("/api/myorders", (request, response) => {
    console.log("Api call received for /myorders");
    response.sendStatus(418);
});

app.get("/api/admin/edit", (request, response) => {
    console.log("Api call received for /admin/edit");
    response.sendStatus(418);
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));
