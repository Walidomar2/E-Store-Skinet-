using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.Property(x => x.NameAr).IsRequired();
            builder.Property(x => x.NameEn).IsRequired();
            builder.Property(x => x.DescriptionEn).IsRequired();
            builder.Property(x => x.DescriptionAr).IsRequired();
        }
    }
}
