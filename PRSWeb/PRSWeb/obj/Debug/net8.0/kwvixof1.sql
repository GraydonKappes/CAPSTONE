IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [User] (
    [Id] int NOT NULL IDENTITY,
    [Username] varchar(20) NOT NULL,
    [Password] varchar(10) NOT NULL,
    [FirstName] varchar(20) NOT NULL,
    [LastName] varchar(20) NOT NULL,
    [PhoneNumber] varchar(17) NOT NULL,
    [Email] varchar(75) NOT NULL,
    [Reviewer] bit NOT NULL,
    [Admin] bit NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Vendor] (
    [Id] int NOT NULL IDENTITY,
    [Code] varchar(10) NOT NULL,
    [Name] varchar(255) NOT NULL,
    [Address] varchar(255) NOT NULL,
    [City] varchar(255) NOT NULL,
    [State] varchar(2) NOT NULL,
    [Zip] varchar(5) NOT NULL,
    [PhoneNumber] varchar(12) NOT NULL,
    [Email] varchar(100) NOT NULL,
    CONSTRAINT [PK_Vendor] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Request] (
    [Id] int NOT NULL IDENTITY,
    [RequestNumber] nvarchar(max) NOT NULL,
    [UserId] int NOT NULL,
    [Description] varchar(100) NOT NULL,
    [Justification] varchar(255) NOT NULL,
    [DateNeeded] date NULL,
    [DeliveryMode] varchar(25) NOT NULL,
    [Status] varchar(20) NULL,
    [Total] decimal(10,2) NOT NULL,
    [SubmittedDate] datetime NULL,
    [ReasonForRejection] varchar(100) NULL,
    CONSTRAINT [PK_Request] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Request_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Product] (
    [Id] int NOT NULL IDENTITY,
    [VendorId] int NOT NULL,
    [PartNumber] varchar(50) NOT NULL,
    [Name] varchar(255) NOT NULL,
    [Price] decimal(10,2) NOT NULL,
    [Unit] varchar(50) NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Product_Vendor_VendorId] FOREIGN KEY ([VendorId]) REFERENCES [Vendor] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [LineItem] (
    [Id] int NOT NULL IDENTITY,
    [RequestId] int NOT NULL,
    [ProductId] int NOT NULL,
    [Quantity] int NOT NULL,
    CONSTRAINT [PK_LineItem] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_LineItem_Product_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Product] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_LineItem_Request_RequestId] FOREIGN KEY ([RequestId]) REFERENCES [Request] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_LineItem_ProductId] ON [LineItem] ([ProductId]);
GO

CREATE UNIQUE INDEX [UQ_LineItem_Req_Prod] ON [LineItem] ([RequestId], [ProductId]);
GO

CREATE UNIQUE INDEX [UQ_Product_Vid_Pnum] ON [Product] ([VendorId], [PartNumber]);
GO

CREATE INDEX [IX_Request_UserId] ON [Request] ([UserId]);
GO

CREATE UNIQUE INDEX [UQ_User_Email] ON [User] ([Email]);
GO

CREATE UNIQUE INDEX [UQ_User_Person] ON [User] ([FirstName], [LastName], [PhoneNumber]);
GO

CREATE UNIQUE INDEX [UQ_User_Username] ON [User] ([Username]);
GO

CREATE UNIQUE INDEX [UQ_Vendor_Business] ON [Vendor] ([Name], [Address], [City], [State]);
GO

CREATE UNIQUE INDEX [UQ_Vendor_Code] ON [Vendor] ([Code]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240930140003_InitialCreate', N'8.0.8');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240930140203_AddRequestNumber', N'8.0.8');
GO

COMMIT;
GO

