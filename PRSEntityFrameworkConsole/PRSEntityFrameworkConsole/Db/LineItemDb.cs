using PRSEntityFrameworkConsole.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRSEntityFrameworkConsole.Db
{
    public class LineItemDb
    {
        private prsdbContext dbContext = new();

        public List<LineItem> GetLineItems()
        {
            return dbContext.LineItems.ToList();
        }
        public LineItem FindLineItem(int id)
        {
            return dbContext.LineItems.Where(li => li.Id == id).FirstOrDefault();
        }

        public void AddLineItem(LineItem lineItem)
        {
            dbContext.LineItems.Add(lineItem);
            dbContext.SaveChanges();
        }

        public void RemoveLineItem(LineItem lineItem)
        {
            dbContext.LineItems.Remove(lineItem);
            dbContext.SaveChanges();
        }
    }
}
