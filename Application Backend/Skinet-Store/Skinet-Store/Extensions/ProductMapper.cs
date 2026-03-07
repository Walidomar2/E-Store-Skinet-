using Skinet_Store.DTOs.Product;
using Core.Entities;

namespace Skinet_Store.Extensions
{
    public static class ProductMapper
    {
        public static ProductDto ToDto(this Product product, bool isArabic)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = isArabic? product.NameAr : product.NameEn,
                Description = isArabic ? product.DescriptionAr : product.DescriptionEn,
                Brand = isArabic? product.Brand?.NameAr : product.Brand?.NameEn,
                PictureUrl = product.PictureUrl,
                Price = product.Price,
                QuantityInStock = product.QuantityInStock,
                Type = isArabic? product.TypeAr : product.TypeEn,
            };
        }

        public static Product ToEntity(this CreateProductDto createProductDto)
        {
            return new Product
            {
                NameEn = createProductDto.NameEn,
                NameAr = createProductDto.NameAr,
                DescriptionEn = createProductDto.DescriptionEn,
                DescriptionAr = createProductDto.DescriptionAr,
                BrandId = createProductDto.BrandId,
                PictureUrl = createProductDto.PictureUrl,
                Price = createProductDto.Price,
                QuantityInStock = createProductDto.QuantityInStock,
                TypeEn = createProductDto.TypeEn,
                TypeAr = createProductDto.TypeAr
            };
        }

        public static Product ToEntity(this UpdateProductDto createProductDto)
        {
            return new Product
            {
                Id = createProductDto.Id,
                NameEn = createProductDto.NameEn,
                NameAr = createProductDto.NameAr,
                DescriptionEn = createProductDto.DescriptionEn,
                DescriptionAr = createProductDto.DescriptionAr,
                BrandId = createProductDto.BrandId,
                PictureUrl = createProductDto.PictureUrl,
                Price = createProductDto.Price,
                QuantityInStock = createProductDto.QuantityInStock,
                TypeEn = createProductDto.TypeEn,
                TypeAr = createProductDto.TypeAr
            };
        }
    }
}
