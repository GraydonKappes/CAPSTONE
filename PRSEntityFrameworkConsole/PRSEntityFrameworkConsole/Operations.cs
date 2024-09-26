using PRSEntityFrameworkConsole.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRSEntityFrameworkConsole
{
    public class Operations
    {
        public prsdbContext context = new prsdbContext();

        // User Operations
        public void ListUsers()
        {
            Console.WriteLine("\nUsers List:");
            Console.WriteLine("=================================");
            List<User> users = context.Users.ToList();
            foreach (User user in users) {
                Console.WriteLine(user);
            }
        }

        public void GetUser()
        {
            Console.WriteLine("\nGet User By ID:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("User ID: "));
            User u = context.Users.Find(id);
            if (u != null) {
                Console.WriteLine($"User Found: {u}");
            }
            else {
                Console.WriteLine($"No user found for id: {id}");
            }
        }

        public void AddUser()
        {
            Console.WriteLine("\nAdd a User:");
            Console.WriteLine("=================================");
            string username = PromptInput("Username: ");
            string password = PromptInput("Password: ");
            string firstName = PromptInput("First Name: ");
            string lastName = PromptInput("Last Name: ");
            string phoneNumber = PromptInput("Phone Number: ");
            string email = PromptInput("Email: ");
            bool reviewer = bool.Parse(PromptInput("Reviewer (true/false): "));
            bool admin = bool.Parse(PromptInput("Admin (true/false): "));
            User u = new User(username, password, firstName, lastName, phoneNumber, email, reviewer, admin);
            context.Users.Add(u);
            context.SaveChanges();
            Console.WriteLine($"User added: {u}");
        }

        public void DeleteUser()
        {
            Console.WriteLine("\nDelete a User:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("User ID: "));
            User u = context.Users.Find(id);
            if (u != null) {
                context.Users.Remove(u);
                context.SaveChanges();
                Console.WriteLine($"User deleted: {u}");
            }
            else {
                Console.WriteLine($"No user found for id: {id}");
            }
        }

        // Request Operations
        public void ListRequests()
        {
            Console.WriteLine("\nRequests List:");
            Console.WriteLine("=================================");
            List<Request> requests = context.Requests.ToList();
            foreach (Request request in requests) {
                Console.WriteLine(request);
            }
        }

        public void GetRequest()
        {
            Console.WriteLine("\nGet Request By ID:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Request ID: "));
            Request r = context.Requests.Find(id);
            if (r != null) {
                Console.WriteLine($"Request Found: {r}");
            }
            else {
                Console.WriteLine($"No request found for id: {id}");
            }
        }

        public void AddRequest()
        {
            Console.WriteLine("\nAdd a Request:");
            Console.WriteLine("=================================");
            int userId = Int32.Parse(PromptInput("User ID: "));
            string description = PromptInput("Description: ");
            string justification = PromptInput("Justification: ");
            string deliveryMode = PromptInput("Delivery Mode: ");
            string status = "NEW";
            decimal total = 0;
            Request r = new Request(userId, description, justification, deliveryMode, status, total);
            context.Requests.Add(r);
            context.SaveChanges();
            Console.WriteLine($"Request added: {r}");
        }

        public void DeleteRequest()
        {
            Console.WriteLine("\nDelete a Request:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Request ID: "));
            Request r = context.Requests.Find(id);
            if (r != null) {
                context.Requests.Remove(r);
                context.SaveChanges();
                Console.WriteLine($"Request deleted: {r}");
            }
            else {
                Console.WriteLine($"No request found for id: {id}");
            }
        }

        // Vendor Operations
        public void ListVendors()
        {
            Console.WriteLine("\nVendors List:");
            Console.WriteLine("=================================");
            List<Vendor> vendors = context.Vendors.ToList();
            foreach (Vendor vendor in vendors) {
                Console.WriteLine(vendor);
            }
        }

        public void GetVendor()
        {
            Console.WriteLine("\nGet Vendor By ID:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Vendor ID: "));
            Vendor v = context.Vendors.Find(id);
            if (v != null) {
                Console.WriteLine($"Vendor Found: {v}");
            }
            else {
                Console.WriteLine($"No vendor found for id: {id}");
            }
        }

        public void AddVendor()
        {
            Console.WriteLine("\nAdd a Vendor:");
            Console.WriteLine("=================================");
            string code = PromptInput("Code: ");
            string name = PromptInput("Name: ");
            string address = PromptInput("Address: ");
            string city = PromptInput("City: ");
            string state = PromptInput("State: ");
            string zip = PromptInput("Zip: ");
            string phoneNumber = PromptInput("Phone Number: ");
            string email = PromptInput("Email: ");
            Vendor v = new Vendor(code, name, address, city, state, zip, phoneNumber, email);
            context.Vendors.Add(v);
            context.SaveChanges();
            Console.WriteLine($"Vendor added: {v}");
        }

        public void DeleteVendor()
        {
            Console.WriteLine("\nDelete a Vendor:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Vendor ID: "));
            Vendor v = context.Vendors.Find(id);
            if (v != null) {
                context.Vendors.Remove(v);
                context.SaveChanges();
                Console.WriteLine($"Vendor deleted: {v}");
            }
            else {
                Console.WriteLine($"No vendor found for id: {id}");
            }
        }

        // Product Operations
        public void ListProducts()
        {
            Console.WriteLine("\nProducts List:");
            Console.WriteLine("=================================");
            List<Product> products = context.Products.ToList();
            foreach (Product product in products) {
                Console.WriteLine(product);
            }
        }

        public void GetProduct()
        {
            Console.WriteLine("\nGet Product By ID:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Product ID: "));
            Product p = context.Products.Find(id);
            if (p != null) {
                Console.WriteLine($"Product Found: {p}");
            }
            else {
                Console.WriteLine($"No product found for id: {id}");
            }
        }

        public void AddProduct()
        {
            Console.WriteLine("\nAdd a Product:");
            Console.WriteLine("=================================");
            int vendorId = int.Parse(PromptInput("Vendor ID: "));
            string partNumber = PromptInput("Part Number: ");
            string name = PromptInput("Name: ");
            decimal price = decimal.Parse(PromptInput("Price: "));
            string unit = PromptInput("Unit: ");

            Product p = new Product(vendorId, partNumber, name, price, unit);
            context.Products.Add(p);
            context.SaveChanges();
            Console.WriteLine($"Product added: {p}");
        }

        public void DeleteProduct()
        {
            Console.WriteLine("\nDelete a Product:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Product ID: "));
            Product p = context.Products.Find(id);
            if (p != null) {
                context.Products.Remove(p);
                context.SaveChanges();
                Console.WriteLine($"Product deleted: {p}");
            }
            else {
                Console.WriteLine($"No product found for id: {id}");
            }
        }

        // LineItem Operations
        public void ListLineItems()
        {
            Console.WriteLine("\nLine Items List:");
            Console.WriteLine("=================================");
            List<LineItem> lineItems = context.LineItems.ToList();
            foreach (LineItem lineItem in lineItems) {
                Console.WriteLine(lineItem);
            }
        }

        public void GetLineItem()
        {
            Console.WriteLine("\nGet Line Item By ID:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Line Item ID: "));
            LineItem li = context.LineItems.Find(id);
            if (li != null) {
                Console.WriteLine($"Line Item Found: {li}");
            }
            else {
                Console.WriteLine($"No line item found for id: {id}");
            }
        }

        public void AddLineItem()
        {
            Console.WriteLine("\nAdd a Line Item:");
            Console.WriteLine("=================================");
            int requestId = Int32.Parse(PromptInput("Request ID: "));
            int productId = Int32.Parse(PromptInput("Product ID: "));
            int quantity = Int32.Parse(PromptInput("Quantity: "));
            LineItem li = new LineItem(requestId, productId, quantity);
            context.LineItems.Add(li);
            context.SaveChanges();
            Console.WriteLine($"Line Item added: {li}");
        }

        public void DeleteLineItem()
        {
            Console.WriteLine("\nDelete a Line Item:");
            Console.WriteLine("=================================");
            int id = Int32.Parse(PromptInput("Line Item ID: "));
            LineItem li = context.LineItems.Find(id);
            if (li != null) {
                context.LineItems.Remove(li);
                context.SaveChanges();
                Console.WriteLine($"Line Item deleted: {li}");
            }
            else {
                Console.WriteLine($"No line item found for id: {id}");
            }
        }

        public string PromptInput(string prompt)
        {
            Console.Write(prompt);
            return Console.ReadLine();
        }
    }
}