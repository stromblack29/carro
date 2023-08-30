using carro_test_api.Models;
using Microsoft.EntityFrameworkCore;

namespace carro_test_api.Context
{
    public class DataContext : DbContext
    {
        public DataContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseInMemoryDatabase("carro-db");

        public DbSet<User> users { get; set; }
    }
}
