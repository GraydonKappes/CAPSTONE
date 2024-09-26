using PRSWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace PRSWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddDbContext<prsdbContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("prsdbConnectionString"))
                );

            builder.Services.AddControllers();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
