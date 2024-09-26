using PRSEntityFrameworkConsole.Db;
using PRSEntityFrameworkConsole.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRSEntityFrameworkConsole
{
    internal class Manager
    {

        private static Operations operations = new Operations();

        static LineItemDb lineItemDb = new();
        static ProductDb productDb = new();
        static RequestDb requestDb = new();
        static UserDb userDb = new();
        static VendorDb vendorDb = new();

        
        static string PromptInput(string prompt)
        {
            Console.Write(prompt);
            return Console.ReadLine();
        }

        static void FirstDisplayMenu()
        {
            Console.WriteLine("Entity MENU:");
            Console.WriteLine("==============");
            Console.WriteLine("vendorDb - edit the Vendor Table");
            Console.WriteLine("userDb - edit the User Table");
            Console.WriteLine("requestDb - edit the Request Table");
            Console.WriteLine("productDb - edit the Product Table");
            Console.WriteLine("lineItemDb - edit the lineItemDb Table");
            Console.WriteLine("exit - exit the application");
        }
        public void FirstMenu()
        {
            string command = "";
            while (command != "exit") {
                FirstDisplayMenu();
                command = PromptInput("Command: ");
                switch (command) {
                    case "vendorDb":
                        VendorMenu();
                        break;
                    case "userDb":
                        UserMenu();
                        break;
                    case "requestDb":
                        RequestMenu();
                        break;
                    case "productDb":
                        ProductMenu();
                        break;
                    case "lineItemDb":
                        LineItemMenu();
                        break;
                    case "exit":
                        break;
                    default:
                        Console.WriteLine("invalid command. Try again.");
                        break;
                }
            }
        }
        static void VendorDisplayMenu()
        {
            Console.WriteLine("Vendor MENU:");
            Console.WriteLine("==============");
            Console.WriteLine("list - list the Vendor Table");
            Console.WriteLine("get - get Vendor");
            Console.WriteLine("add - add Vendor");
            Console.WriteLine("del - edit the Product Table");
            Console.WriteLine("mainMenu - return to the main menu");
            Console.WriteLine("exit - exit the application");
        }
        public void VendorMenu()
        {
            string command = "";
            while (command != "exit") {
                VendorDisplayMenu();
                command = PromptInput("Command: ");
                switch (command) {
                    case "list":
                        operations.ListVendors();
                        break;
                    case "get":
                        operations.GetVendor();
                        break;
                    case "add":
                        operations.AddVendor();
                        break;
                    case "del":
                        operations.DeleteVendor();
                        break;
                    case "mainMenu":
                        FirstMenu();
                        break;
                    case "exit":
                        break;
                    default:
                        Console.WriteLine("Invalid command. Try again.");
                        break;
                }
            }
        }
        static void UserDisplayMenu()
        {
            Console.WriteLine("User MENU:");
            Console.WriteLine("==============");
            Console.WriteLine("list - edit the User Table");
            Console.WriteLine("get - edit the User Table");
            Console.WriteLine("add - edit the User Table");
            Console.WriteLine("del - edit the User Table");
            Console.WriteLine("mainMenu - return to First Menu");
            Console.WriteLine("exit - exit the application");
        }
        public void UserMenu()
        {
            string command = "";
            while (command != "exit") {
                UserDisplayMenu();
                command = PromptInput("Command: ");
                switch (command) {
                    case "list":
                        operations.ListUsers();
                        break;
                    case "get":
                        operations.GetUser();
                        break;
                    case "add":
                        operations.AddUser();
                        break;
                    case "del":
                        operations.DeleteUser();
                        break;
                    case "mainMenu":
                        FirstMenu();
                        break;
                    case "exit":
                        break;
                    default:
                        Console.WriteLine("Invalid command. Try again.");
                        break;
                }
            }
        }

        static void RequestDisplayMenu()
        {
            Console.WriteLine("Request MENU:");
            Console.WriteLine("==============");
            Console.WriteLine("list - edit the Request Table");
            Console.WriteLine("get - edit the Request Table");
            Console.WriteLine("add - edit the Request Table");
            Console.WriteLine("del - edit the Request Table");
            Console.WriteLine("mainMenu - return to First Menu");
            Console.WriteLine("exit - exit the application");
        }
        public void RequestMenu()
        {
            string command = "";
            while (command != "exit") {
                RequestDisplayMenu();
                command = PromptInput("Command: ");
                switch (command) {
                    case "list":
                        operations.ListRequests();
                        break;
                    case "get":
                        operations.GetRequest();
                        break;
                    case "add":
                        operations.AddRequest();
                        break;
                    case "del":
                        operations.DeleteRequest();
                        break;
                    case "mainMenu":
                        FirstMenu();
                        break;
                    case "exit":
                        break;
                    default:
                        Console.WriteLine("Invalid command. Try again.");
                        break;
                }
            }
        }

        static void ProductDisplayMenu()
        {
            Console.WriteLine("Request MENU:");
            Console.WriteLine("==============");
            Console.WriteLine("list - edit the Product Table");
            Console.WriteLine("get - edit the Product Table");
            Console.WriteLine("add - edit the Product Table");
            Console.WriteLine("del - edit the Product Table");
            Console.WriteLine("mainMenu - return to First Menu");
            Console.WriteLine("exit - exit the application");
        }
        public void ProductMenu()
        {
            string command = "";
            while (command != "exit") {
                ProductDisplayMenu();
                command = PromptInput("Command: ");
                switch (command) {
                    case "list":
                        operations.ListProducts();
                        break;
                    case "get":
                        operations.GetProduct();
                        break;
                    case "add":
                        operations.AddProduct();
                        break;
                    case "del":
                        operations.DeleteProduct();
                        break;
                    case "mainMenu":
                        FirstMenu();
                        break;
                    case "exit":
                        break;
                    default:
                        Console.WriteLine("Invalid command. Try again.");
                        break;
                }
            }
        }
        static void LineItemDisplayMenu()
        {
            Console.WriteLine("Request MENU:");
            Console.WriteLine("==============");
            Console.WriteLine("list - edit the LineItem Table");
            Console.WriteLine("get - edit the LineItem Table");
            Console.WriteLine("add - edit the LineItem Table");
            Console.WriteLine("del - edit the LineItem Table");
            Console.WriteLine("mainMenu - return to First Menu");
            Console.WriteLine("exit - exit the application");
        }
        public void LineItemMenu()
        {
            string command = "";
            while (command != "exit") {
                LineItemDisplayMenu();
                command = PromptInput("Command: ");
                switch (command) {
                    case "list":
                        operations.ListLineItems();
                        break;
                    case "get":
                        operations.GetLineItem();
                        break;
                    case "add":
                        operations.AddLineItem();
                        break;
                    case "del":
                        operations.DeleteLineItem();
                        break;
                    case "mainMenu":
                        FirstMenu();
                        break;
                    case "exit":
                        break;
                    default:
                        Console.WriteLine("Invalid command. Try again.");
                        break;
                }
            }
        }

    }
}
