using PRSEntityFrameworkConsole.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRSEntityFrameworkConsole.Db
{
    public class ProductDb
    {
        private prsdbContext dbContext = new();

        public List<Product> GetProducts()
        {
            return dbContext.Products.ToList();
        }
        public Product FindProduct(int id)
        {
            return dbContext.Products.Where(p => p.Id == id).FirstOrDefault();
        }

        public void AddProduct(Product product)
        {
            dbContext.Products.Add(product);
            dbContext.SaveChanges();
        }

        public void RemoveProduct(Product product)
        {
            dbContext.Products.Remove(product);
            dbContext.SaveChanges();
        }
    }
}
