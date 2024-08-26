USE prsdb

-- Insert sample [User]
INSERT INTO [User] (Username, Password, FirstName, LastName, PhoneNumber, Email, PhoneNumber, Email, Reviewer, Admin) VALUES
('RReyonolds', 'pass123', 'Ryan', 'Reynolds', '(555) 123-4567', 'RReynolds@techco.com', 1, 0),
('EClarke', 'Khaleesi', 'Emilia', 'Clarke', '(555) 987-6543', 'EClarke@techco.com', 0, 1),
('GKappes', 'Kxkappo1', 'Graydon', 'Kappes', '(555) 246-8135', 'GKappes@techco.com', 0, 0);

-- Insert sample Vendor
INSERT INTO Vendor (Code, Name, Address, City, State, Zip, PhoneNumber, Email) VALUES
('AMZN001', 'Amazon', '410 Terry Ave N', 'Seattle', 'WA', '98109', '206-266-1000', 'b2b@amazon.com'),
('MSFT002', 'Microsoft', 'One Microsoft Way', 'Redmond', 'WA', '98052', '425-882-8080', 'msales@microsoft.com'),
('ADBE003', 'Adobe', '345 Park Avenue', 'San Jose', 'CA', '95110', '408-536-6000', 'sales@adobe.com'),
('DELL004', 'Dell', 'One Dell Way', 'Round Rock', 'TX', '78682', '800-624-9897', 'dell@dell.com');

-- Insert sample Product
INSERT INTO Product(VendorId, PartNumber, Name, Price, Unit) VALUES
(1, 'B07ZGLLWBT', 'Dell XPS 15 Laptop', 1799.99),
(1, 'B07W6ZQJN8', 'Logitech MX Master 3 Mouse', 99.99),
(2, 'KLQ-00001', 'Microsoft 365 Business Standard (Annual)', 149.99),
(2, '9NN-00003', 'Visual Studio Professional Subscription (Annual)', 799.99),
(3, '65297935BA01A12', 'Adobe Creative Cloud (Annual)', 599.88),
(4, '210-AVNH', 'Dell UltraSharp U2720Q 27" 4K Monitor', 719.99)
;

-- Insert sample Request
INSERT INTO Request(UserId, Description, Justification, DateNeeded, DeliveryMode, Status, Total, SubmittedDate, ReasonForRejection) VALUES
(1, 'New Developer Workstation', 'Setting up for new hire', '2024-09-15', 'Delivery', 'New', 2619.97),
(2, 'Software Licenses Renewal', 'Annual license renewals', '2024-10-01', 'Online Delivery', 'Approved', 1549.86),
(3, 'Team Peripherals Upgrade', 'Improving team productivity', '2024-09-30', 'Delivery', 'In Review', 499.95);


-- Insert sample LineItem
INSERT INTO LineItem(RequestId, ProductId, Quantity) VALUES
(1, 1, 1),  -- 1 Dell XPS 15 Laptop
(1, 2, 1),  -- 1 Logitech MX Master 3 Mouse
(1, 6, 1),  -- 1 Dell UltraSharp U2720Q 27" 4K Monitor
(2, 3, 5),  -- 5 Microsoft 365 Business Standard licenses
(2, 4, 1),  -- 1 Visual Studio Professional Subscription
(3, 2, 5);  -- 5 Logitech MX Master 3 Mouse