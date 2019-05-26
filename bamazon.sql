DROP DATABASE IF EXISTS Bamazon;
-- create database
CREATE DATABASE Bamazon;
USE Bamazon;
-- create a table
CREATE TABLE Product(
    ItemId INT AUTO_INCREMENT NOT NULL,
    ProductName varchar(100),
    DepartmentName varchar(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(6),
    Sales DECIMAL(10,2),
    PRIMARY KEY(ItemId)
);

CREATE TABLE Departments(
    DepartmentID INT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50),
    OverHeadCosts INT(10),
    TotalSales DECIMAL(10,2),
    PRIMARY KEY(DepartmentID)
);

-- initial data load into Product table
INSERT INTO Product (ProductName,DepartmentName,Price,StockQuantity,Sales)
VALUES ("Tennis Nike", "Sports", 100, 10, 0),
	   ("Tennis Addidas", "Sports", 85, 10, 0),
       ("Tooth paste", "Cosmetics", 3, 100, 0),
       ("Nail Clipper", "Cosmetics", 5, 25, 0),
       ("Big pane", "Kitchen", 20, 8, 0),
       ("Microwave", "Kitchen", 250, 10, 0),
       ("Knife set", "Kitchen", 45, 15, 0),
       ("Bicycle helmet", "Sports", 22, 12, 0),
       ("Liquid hands soap", "Cosmetics", 5, 33, 0),
       ("Camping tools", "Sports", 50, 7, 0),
       ("Blender", "Kitchen", 33, 13, 0)
       ;
       
INSERT INTO Departments (DepartmentName,OverHeadCosts,TotalSales)
VALUES ("Sports", 1000, 0),
	   ("Cosmetics", 1400, 0),
       ("Kitchen", 1600, 1600)
       ;

-- sum total revenue
SELECT DepartmentName, 
sum(OverHeadCosts) as cost, sum(TotalSales) as sales FROM 
Bamazon.Departments GROUP BY DepartmentName;

SELECT * FROM product;