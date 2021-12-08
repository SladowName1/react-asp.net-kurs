using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace KURSOVOI.Models
{
    public partial class tricksContext : DbContext
    {
        public tricksContext()
        {
        }

        public tricksContext(DbContextOptions<tricksContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Favorite> Favorites { get; set; }
        public virtual DbSet<Infoaboutuser> Infoaboutusers { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Productverification> Productverifications { get; set; }
        public virtual DbSet<Typeproduct> Typeproducts { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Fiend1001;database=tricks", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.27-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.ToTable("favorite");

                entity.HasIndex(e => e.IdProduct, "idProduct");

                entity.HasIndex(e => e.IdUser, "idUser");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdProduct).HasColumnName("idProduct");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.HasOne(d => d.IdProductNavigation)
                    .WithMany(p => p.Favorites)
                    .HasForeignKey(d => d.IdProduct)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("favorite_ibfk_1");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Favorites)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("favorite_ibfk_2");
            });

            modelBuilder.Entity<Infoaboutuser>(entity =>
            {
                entity.ToTable("infoaboutuser");

                entity.HasIndex(e => e.IdUser, "idUser");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.Lastlogin)
                    .HasColumnType("date")
                    .HasColumnName("lastlogin");

                entity.Property(e => e.Photo)
                    .HasMaxLength(100)
                    .HasColumnName("photo");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Infoaboutusers)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("infoaboutuser_ibfk_1");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.HasIndex(e => e.IdTypeProduct, "idTypeProduct");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(1000)
                    .HasColumnName("description");

                entity.Property(e => e.IdTypeProduct).HasColumnName("idTypeProduct");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.NumberOfLikes)
                    .HasColumnName("numberOfLikes")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Video)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("video")
                    .UseCollation("utf8_general_ci")
                    .HasCharSet("utf8");

                entity.HasOne(d => d.IdTypeProductNavigation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.IdTypeProduct)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("product_ibfk_1");
            });

            modelBuilder.Entity<Productverification>(entity =>
            {
                entity.ToTable("productverification");

                entity.HasIndex(e => e.IdUser, "idUser");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.Verification)
                    .HasColumnType("enum('yes','not','checked')")
                    .HasColumnName("verification");

                entity.Property(e => e.Video)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("video");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Productverifications)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("productverification_ibfk_1");
            });

            modelBuilder.Entity<Typeproduct>(entity =>
            {
                entity.ToTable("typeproduct");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30)
                    .HasColumnName("name");

                entity.Property(e => e.Photo)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("photo");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.Login, "login")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("login");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasColumnType("enum('admin','user')")
                    .HasColumnName("role");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
