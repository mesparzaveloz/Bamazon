var mysql = require('mysql');
var inquirer = require("inquirer");
var inventory = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jrz656@7-998", //Your password
    database: "bamazon"
})

connection.query('SELECT * FROM product', function(err, res) {
  if (err) throw err;

  res.forEach(function(i){
      console.log(i)
  });
  options();
});


// connection.connect(function (err) {
// 	if (err)
// 		throw err;

// 	options();
// });

function options() {
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
			"Buy an item?",
			"Exit" ]
	}).then(function (answer) {
		switch (answer.action) {
			case "Buy an item?":
				purchasing();
				break;
			case "Exit":
				connection.end();
				break;
		}
	});
}

function purchasing() {
	inquirer.prompt({
		name: "ItemId",
		type: "input",
		message: "What item would you like to buy?"
	}).then(function (answer) {
		connection.query("SELECT * FROM product WHERE ?", { ItemId: answer.ItemId }, function (err, res) {
			if (res.length > 0) {
        console.log(res);
        inventory = res[0].StockQuantity;
        inquirer.prompt({
          name: "Qty",
          type: "input",
          message: "How many do you need?"
        }).then(function (answer) {
          console.log("item inventory= ", inventory, "   amount to buy= ", answer.Qty);
          if (inventory > answer.Qty) {
            updateDBs(res[0].ItemId, answer.Qty);
            options();
          }
          else {
            console.log("We are sorry, we do not have enough in our inventory");
            options();
          }
        })
        }
      else {
        console.log("Item not found, please try another one.   Thanks !!!");
        options();
      }
    })
		});
	};


function updateDBs(Item,amount) {
  connection.query(`UPDATE product SET StockQuantity = StockQuantity - ${amount} WHERE ?`, {ItemId: Item} , function(err, res){
    console.log(res.message);
  });
  connection.query(`UPDATE product SET Sales = Sales + ${amount} * Price WHERE ?`, {ItemId: Item} , function(err, res){
    console.log(res.message);
  });
  connection.end();
}