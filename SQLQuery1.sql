-- Create database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ebaylistingdb')
BEGIN
    CREATE DATABASE ebaylistingdb;
END
GO

USE ebaylistingdb;
GO

-- Create PromptConfigurations table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PromptConfigurations')
BEGIN
    CREATE TABLE PromptConfigurations (
        PromptConfigId INT IDENTITY(1,1) PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        PromptTemplate TEXT NOT NULL,
        IsDefault BIT DEFAULT 0,
        CreateDate DATETIME DEFAULT GETDATE(),
        UpdateDate DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create Listings table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Listings')
BEGIN
    CREATE TABLE Listings (
        ListingId INT IDENTITY(1,1) PRIMARY KEY,
        Title VARCHAR(255) NOT NULL,
        Description TEXT,
        Notes TEXT,
        ProductId VARCHAR(50),
        CreateDate DATETIME DEFAULT GETDATE(),
        UpdateDate DATETIME DEFAULT GETDATE(),
        PromptConfigId INT,
        FOREIGN KEY (PromptConfigId) REFERENCES PromptConfigurations(PromptConfigId)
    );
END
GO

-- Create GenerationHistory table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'GenerationHistory')
BEGIN
    CREATE TABLE GenerationHistory (
        GenerationId INT IDENTITY(1,1) PRIMARY KEY,
        ListingId INT,
        PromptConfigId INT,
        GeneratedDescription TEXT NOT NULL,
        UserFeedback TEXT,
        GenerationDate DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (ListingId) REFERENCES Listings(ListingId),
        FOREIGN KEY (PromptConfigId) REFERENCES PromptConfigurations(PromptConfigId)
    );
END
GO

-- Insert default prompt configuration if it doesn't exist
IF NOT EXISTS (SELECT * FROM PromptConfigurations WHERE IsDefault = 1)
BEGIN
    INSERT INTO PromptConfigurations (Name, PromptTemplate, IsDefault)
    VALUES (
        'Default Auto Parts Template',
        'Create a detailed eBay listing description for the following auto part: {{Title}}

Please include:
1. Compatibility information
2. Part condition and specifications
3. Installation notes
4. What''s included in the package
5. Shipping information
6. Return policy notes

Make the description engaging and professional while highlighting the key features and benefits.',
        1
    );
END
GO