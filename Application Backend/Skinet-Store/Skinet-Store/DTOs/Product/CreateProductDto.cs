using System.ComponentModel.DataAnnotations;

namespace Skinet_Store.DTOs.Product
{
    public class CreateProductDto
    {
        [Required] public string NameEn { get; set; } = string.Empty;
        [Required] public string NameAr { get; set; } = string.Empty;

        [Required] public string DescriptionEn { get; set; } = string.Empty;
        [Required] public string DescriptionAr { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        [Required] public decimal Price { get; set; }

        [Required] public string PictureUrl { get; set; } = string.Empty;
        [Required] public string TypeEn { get; set; } = string.Empty;
        [Required] public string TypeAr { get; set; } = string.Empty;
        [Required] public Guid BrandId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity in stock must be at least 1")]
        [Required] public int QuantityInStock { get; set; }

    }
}
