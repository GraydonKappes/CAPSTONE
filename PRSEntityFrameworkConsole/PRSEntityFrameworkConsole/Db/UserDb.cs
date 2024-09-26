using PRSEntityFrameworkConsole.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRSEntityFrameworkConsole.Db
{
    public class UserDb
    {
        private prsdbContext dbContext = new();

        public List<User> GetUsers()
        {
            return dbContext.Users.ToList();
        }
        public User FindUser(int id)
        {
            return dbContext.Users.Where(u => u.Id == id).FirstOrDefault();
        }

        public void AddUser(User user)
        {
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
        }

        public void RemoveUser(User user)
        {
            dbContext.Users.Remove(user);
            dbContext.SaveChanges();
        }
    }
}
