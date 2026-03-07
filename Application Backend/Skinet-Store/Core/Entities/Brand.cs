namespace Core.Entities
{
    public class Brand : BaseEntity
    {
        public required string NameEn { get; set; }
        public required string NameAr { get; set; }
        public required string DescriptionEn { get; set; }
        public required string DescriptionAr { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
