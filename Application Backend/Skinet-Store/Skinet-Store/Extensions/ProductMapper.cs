using Skinet_Store.DTOs.Product;
using Core.Entities;

namespace Skinet_Store.Extensions
{
    public static class ProductMapper
    {
        public static ProductDto ToDto(this Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Brand = product.Brand,
                PictureUrl = product.PictureUrl,
                Price = product.Price,
                QuantityInStock = product.QuantityInStock,
                Type = product.Type
            };
        }

        public static Product ToEntity(this CreateProductDto createProductDto)
        {
            return new Product
            {
                Name = createProductDto.Name,
                Description = createProductDto.Description,
                Brand = createProductDto.Brand,
                PictureUrl = createProductDto.PictureUrl,
                Price = createProductDto.Price,
                QuantityInStock = createProductDto.QuantityInStock,
                Type = createProductDto.Type
            };
        }

        public static Product ToEntity(this UpdateProductDto createProductDto)
        {
            return new Product
            {
                Id = createProductDto.Id,
                Name = createProductDto.Name,
                Description = createProductDto.Description,
                Brand = createProductDto.Brand,
                PictureUrl = createProductDto.PictureUrl,
                Price = createProductDto.Price,
                QuantityInStock = createProductDto.QuantityInStock,
                Type = createProductDto.Type
            };
        }
    }
}
