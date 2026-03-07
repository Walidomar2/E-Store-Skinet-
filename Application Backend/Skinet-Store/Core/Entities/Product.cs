using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public required string NameEn { get; set; }
        public required string NameAr { get; set; }
        public required string DescriptionEn { get; set; }
        public required string DescriptionAr { get; set; }
        public decimal Price { get; set; }
        public required string PictureUrl { get; set; }
        public required string TypeEn { get; set; }
        public required string TypeAr { get; set; }
        public int QuantityInStock { get; set; }
        public Guid BrandId { get; set; }
        public Brand? Brand { get; set; }

    }
}
