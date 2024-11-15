-- Select the 'master' database (MySQL equivalent is typically 'mysql')

-- Check if the database exists, drop it if it does, then create it
DROP DATABASE IF EXISTS prsdb;
CREATE DATABASE prsdb;
USE prsdb;

-- User Table
CREATE TABLE User (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(20) NOT NULL,
    Password VARCHAR(10) NOT NULL,
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    PhoneNumber VARCHAR(17) NOT NULL,
    Email VARCHAR(75) NOT NULL,
    Reviewer BOOLEAN DEFAULT 0 NOT NULL,
    Admin BOOLEAN DEFAULT 0 NOT NULL,
    CONSTRAINT UQ_User_Username UNIQUE (Username),
    CONSTRAINT UQ_User_Person UNIQUE (FirstName, LastName, PhoneNumber),
    CONSTRAINT UQ_User_Email UNIQUE (Email)
);

-- Vendor Table
CREATE TABLE Vendor (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Code VARCHAR(10) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    State CHAR(2) NOT NULL,
    Zip CHAR(5) NOT NULL,
    PhoneNumber VARCHAR(12) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    CONSTRAINT UQ_Vendor_Code UNIQUE (Code),
    CONSTRAINT UQ_Vendor_Business UNIQUE (Name, Address, City, State)
);

-- Product Table
CREATE TABLE Product (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    VendorId INT NOT NULL,
    PartNumber VARCHAR(50) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Unit VARCHAR(50) NOT NULL,
    FOREIGN KEY (VendorId) REFERENCES Vendor(Id),
    CONSTRAINT UQ_Product_Vid_Pnum UNIQUE (VendorId, PartNumber)
);

-- Request Table
CREATE TABLE Request (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    Description VARCHAR(100) NOT NULL,
    Justification VARCHAR(255) NOT NULL,
    DateNeeded DATE NULL,
    DeliveryMode VARCHAR(25) NOT NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'New',
    Total DECIMAL(10, 2) NOT NULL,
    SubmittedDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ReasonForRejection VARCHAR(100) NULL,
    FOREIGN KEY (UserId) REFERENCES User(Id)
);

-- LineItem Table
CREATE TABLE LineItem (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    RequestId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES Product(Id),
    FOREIGN KEY (RequestId) REFERENCES Request(Id),
    CONSTRAINT UQ_LineItem_Req_Prod UNIQUE (RequestId, ProductId)
);
