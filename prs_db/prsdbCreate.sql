USE MASTER;
GO

-- Check if the database exists
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'prsdb')
BEGIN
    -- Set database to single user mode and close existing connections
    ALTER DATABASE prs_db SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    
    -- Now drop the database
    DROP DATABASE prsdb;
END
GO

CREATE DATABASE prsdb;
GO

USE prsdb;
GO

-- User Table
CREATE TABLE [User] (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username	VARCHAR(20)		NOT NULL,
    Password	VARCHAR(10)		NOT NULL,
    FirstName	VARCHAR(20)		NOT NULL,
    LastName	VARCHAR(20)		NOT NULL,
    PhoneNumber VARCHAR(17)		NOT NULL,
    Email		VARCHAR(75)		NOT NULL,
    Reviewer	BIT				DEFAULT 0	NOT NULL,
    Admin		BIT				DEFAULT 0	NOT NULL,
    CONSTRAINT UQ_User_Username UNIQUE (Username),
	CONSTRAINT UQ_User_Person	UNIQUE (FirstName, LastName, PhoneNumber),
	CONSTRAINT UQ_User_Email	UNIQUE (Email)
);

-- Vendor Table
CREATE TABLE Vendor (Id 				int		 		PRIMARY KEY IDENTITY(1,1),Code 			varchar(10) 	NOT NULL,Name 			varchar(255) 	NOT NULL,Address 		varchar(255) 	NOT NULL,City 			varchar(255) 	NOT NULL,State 			char(2) 		NOT NULL,Zip 			char(5) 		NOT NULL,PhoneNumber	 	varchar(12) 	NOT NULL,Email 			varchar(100) 	NOT NULL,CONSTRAINT UQ_Vendor_Code		UNIQUE (Code),CONSTRAINT UQ_Vendor_Business	UNIQUE (Name, Address, City, State));
-- Product Table
CREATE TABLE Product (
    Id INT PRIMARY KEY IDENTITY(1,1),
    VendorId	INT					NOT NULL,
    PartNumber	VARCHAR(50)			NOT NULL,
    Name		VARCHAR(255)		NOT NULL,
    Price		DECIMAL(10, 2)		NOT NULL,
    Unit VARCHAR(50)				NOT NULL,
    FOREIGN KEY (VendorId)			REFERENCES Vendor(Id),
    CONSTRAINT UQ_Product_Vid_Pnum	UNIQUE (VendorId, PartNumber)
);

-- Request Table
CREATE TABLE Request (
    Id					INT				PRIMARY KEY IDENTITY(1,1),
    UserId				INT				NOT NULL,
    Description			VARCHAR(100)	NOT NULL,
    Justification		VARCHAR(255)	NOT NULL,
    DateNeeded			DATE			NULL,
    DeliveryMode		VARCHAR(25)		NOT NULL,
    Status				VARCHAR(20)		NOT NULL DEFAULT 'New',
    Total				DECIMAL(10, 2)	NOT NULL,
    SubmittedDate		DATETIME		default current_timestamp NOT NULL,
    ReasonForRejection	VARCHAR(100)	NULL,
    FOREIGN KEY (UserId) REFERENCES [User](Id)
);

-- LineItem Table
CREATE TABLE LineItem (Id 				int 		PRIMARY KEY IDENTITY(1,1),RequestId 		int 		not null,ProductId 		int 		not null,Quantity 		int 		not null,FOREIGN KEY (ProductId) REFERENCES Product(Id),FOREIGN KEY (RequestId) REFERENCES Request(Id),CONSTRAINT UQ_LineItem_Req_Prod UNIQUE (RequestId, ProductId));