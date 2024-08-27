using Microsoft.EntityFrameworkCore;

namespace EyeRidePhoneBook.Server.Models
{
    public class ContactContext : DbContext
    {        
        protected readonly IConfiguration Configuration;

        public ContactContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
