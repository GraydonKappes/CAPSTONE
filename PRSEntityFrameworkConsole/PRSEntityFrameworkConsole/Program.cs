using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace PRSEntityFrameworkConsole
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, Welcome to the PRS database console!");
            Manager _m = new Manager();
            _m.FirstMenu();
            Console.WriteLine("bye nerd");
        }
    }
}
