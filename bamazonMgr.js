var mysql = require('mysql');
var inquirer = require('inquirer');
var inventory = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jrz656@7-998", //Your password
    database: "bamazon"
})

options();


function options() {
    console.log("");
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
            "List of Items",
            "Items with Low Inventory",
            "Adding items to inventory",
            "Add a new Product",
			"Exit" ]
	}).then(function (answer) {
		switch (answer.action) {
			case "List of Items":
				productsForSale();
                break;
            case "Items with Low Inventory":
                lowInventory();
                break;
            case "Adding items to inventory":
                addInventory();
                break;
            case "Add a new Product":
                addNewProduct();
                break;
			case "Exit":
				connection.end();
				break;
		}
	});
}


function productsForSale() {
    connection.query('SELECT * FROM product', function(err, res) {
        if (err) throw err;
      
        res.forEach(function(i){
            console.log(i)
        });        
      });
      console.log(String.fromCharCode(13));
      options();
};

function lowInventory(){
    console.log("List of items with inventory lower than 3")
    connection.query('SELECT * FROM Product where StockQuantity < 3', function(err, res) {
        if (err) throw err;
            for (var i = res.length - 1; i >= 0; i--) {
                console.log(res[i].ItemId,res[i].ProductName, "$ "+res[i].Price,"Inventory: "+res[i].StockQuantity)
            }
            if(res.length == 0){
                console.log("There is no low inventory. ")
            }
        })
    options();
}

function addInventory() {
	inquirer.prompt({
		name: "ItemId",
		type: "input",
		message: "What item would you like to update?"
        }).then(function (answer) {
            connection.query("SELECT * FROM product WHERE ?", { ItemId: answer.ItemId }, function (err, res) {
            if (res.length > 0) {
                console.log(res);
                inventory = res[0].StockQuantity;
                inquirer.prompt({
                name: "Qty",
                type: "input",
                message: "How many want to add?"
                }).then(function (answer) {
                    updateDBs(res[0].ItemId, answer.Qty);
                    options();
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
    connection.query(`UPDATE product SET StockQuantity = StockQuantity + ${amount} WHERE ?`, {ItemId: Item} , function(err, res){
      console.log(res.message);
    });
    connection.end();
  }

function addNewProduct() {
    var iName, iDept = "";
    var iPrice, iQty, iSales = 0;
    console.log("Adding an item   ", iPrice);
	inquirer.prompt({
		name: "ItemName",
		type: "input",
		message: "Name of item e to add:"
        }).then(function (answer) {
            iName = answer.ItemName;
            connection.query("SELECT * FROM product WHERE ?", { ProductName: answer.ItemName }, function (err, res) {
            if (res.length > 0) {
                console.log(res);
                console.log("Item already exists, please try another one.   Thanks !!!");
                options();
            }
            else {
                inquirer.prompt({
                name: "Qty",
                type: "input",
                message: "How many want to add?"
                }).then(function (answer) {
                    iQty = answer.Qty;
                });
                inquirer.prompt({
                name: "Price",
                type: "input",
                message: "Enter unit price: "
                }).then(function (answer) {
                    iPrice = answer.Price;
                });
                inquirer.prompt({
                name: "Dept",
                type: "input",
                message: "To which department it belongs? "
                }).then(function (answer) {
                    iDept = answer.Dept;
                });
                addDBs(iName, iDept, iPrice, iQty, iSales);
                options();
            }
        })
	});
};

function addDBs(iName, iDept, iPrice, iQty, iSales) {
    connection.query("INSERT INTO product (ProductName, DepartmentName, Price, StockQuantity, Sales) VALUES(iName, iDept, iPrice, iQty, iSales)", function (err, res) {
        if (err) throw err;
        console.log("1 record inserted");
  });
}