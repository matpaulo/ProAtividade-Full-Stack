using Microsoft.EntityFrameworkCore;

namespace ProAtividade.Data.Repositories {
  public class AppDbContext : DbContext
  {
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
      public DbSet<User> Users { get; set; }
  }
}

