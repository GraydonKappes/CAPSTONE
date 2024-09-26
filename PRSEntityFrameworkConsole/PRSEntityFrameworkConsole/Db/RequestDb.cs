using PRSEntityFrameworkConsole.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRSEntityFrameworkConsole.Db
{
    public class RequestDb
    {
        private prsdbContext dbContext = new();

        public List<Request> GetRequests()
        {
            return dbContext.Requests.ToList();
        }
        public Request FindRequests(int id)
        {
            return dbContext.Requests.Where(r => r.Id == id).FirstOrDefault();
        }

        public void AddRequest(Request request)
        {
            dbContext.Requests.Add(request);
            dbContext.SaveChanges();
        }

        public void RemoveRequest(Request request)
        {
            dbContext.Requests.Remove(request);
            dbContext.SaveChanges();
        }
    }
}
