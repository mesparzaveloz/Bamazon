# Bamazon
Amazon Alike Node JS App
Author: Marcelino Esparza
Date: 5/25/2019

Homework-12-MySQL
This app is a command line storefront built using Node.js and mySQL. 

mySQL Homework

This app has 2 different functionalities:

Customer

Manager

## Customer

In Customer app, user is initially presented with the list of items available for purchasing.
Then, user is asked to enter item ID to buy, if item exists, user will be asked to enter quantity to purchase; application validate there is enough items in inventory.
If so, user is notified about sale transaction including total amount to pay. At the same time, inventory balance is updated, as well as Sales amount for that particular item

## Manager

In the manager app the user is presented with 4 options:

View Products for Sale
Displays a list of all products for sale.
View Low Inventory
Displays a list of products with less then 3 items left in inventory.
Add to Inventory
Allows the user to add more inventory to an already existing item.
Add New Product
Allows the user to add a completely new product to the database.

## Evidence

Picture below shows initial execution of .sql file

![SQL file](/images/bamazon_sql_execution.JPG)

### Running bamazonCustomer.js
List of items is displayed, then user is asked to choose an option

![SQL file](/images/bamazonCustomer01.JPG)

If user tries to buy an item not existing on inventory, a warning message will be displayed

![SQL file](/images/bamazonCustomer02.JPG)

If item exists, but user try to buy an amount greater than available on inventory, a warning message will be displayed

![SQL file](/images/bamazonCustomer03.JPG)

If user selects a valid amount to buy, data base is updated

![SQL file](/images/bamazonCustomer04.JPG)

![SQL file](/images/bamazonCustomer05.JPG)


### Running bamazonCustomer.js
When running this .js file, user must select from following menu

![SQL file](/images/bamazonMgr01.JPG)

If user choose "List of Items", all items in table produnct are displyed

![SQL file](/images/bamazonMgr02.JPG)

When running option "Items with Low Inventory", items with quantity less than 3 are listed

![SQL file](/images/bamazonMgr03.JPG)
![SQL file](/images/bamazonMgr04.JPG)

When running "Adding items to inventoty"; if user choose an item ID not existing, a warning message is displayed
![SQL file](/images/bamazonMgr05.JPG)

If item exists, user is asked to enter quantity to be added to selected item, then data base is updated accordingly
![SQL file](/images/bamazonMgr06.JPG)
![SQL file](/images/bamazonMgr07.JPG)