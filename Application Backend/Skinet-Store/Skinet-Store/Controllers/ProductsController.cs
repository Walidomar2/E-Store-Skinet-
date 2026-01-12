using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skinet_Store.DTOs;
using Skinet_Store.DTOs.Product;
using Skinet_Store.Extensions;

namespace Skinet_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(ILogger<ProductsController> logger,
                                    IProductRepository productRepository) : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger = logger;
        private readonly IProductRepository _productRepository = productRepository;

        [HttpGet]
        public async Task<ActionResult<PagedResultDto<ProductDto>>> GetProducts([FromQuery] GetAllProductsDto input)
        {
            var products = await _productRepository.GetAllProductsAsync(input.FilterText, input.Brands, input.Types, 
                                                                            input.SkipCount, input.MaxResultCount, input.Sorting);

            var productDtos = products.items.Select(p => p.ToDto()).ToList();

            return Ok(new PagedResultDto<ProductDto>
            {
                Items = productDtos,
                TotalCount = products.count
            });
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ProductDto>> GetProduct([FromRoute]Guid id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            if (product is null)
                return NotFound();

            return Ok(product.ToDto());
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto productDto)
        {
            var product = productDto.ToEntity();

            await _productRepository.AddProductAsync(product);

            if (!await _productRepository.SaveChangesAsync())
                return BadRequest("Failed to create product");

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product.ToDto());
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            if (product is null)
                return NotFound();

            _productRepository.DeleteProductAsync(product);

            if (!await _productRepository.SaveChangesAsync())
                return BadRequest("Failed to delete product");

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductDto productDto)
        {
            var isProductExist = await _productRepository.ProductExists(productDto.Id);

            if (!isProductExist)
                return NotFound();

            var updatedProduct = productDto.ToEntity();
            _productRepository.UpdateProductAsync(updatedProduct);

            if (!await _productRepository.SaveChangesAsync())
                return BadRequest("Failed to update product");

            return NoContent();
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        {
            var brands =  await _productRepository.GetBrandsAsyns();
            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        {
            var types = await _productRepository.GetTypesAsyns();
            return Ok(types);
        } 
    }
}
