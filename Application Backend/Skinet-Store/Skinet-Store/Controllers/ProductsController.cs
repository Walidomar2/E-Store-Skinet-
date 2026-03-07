using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Skinet_Store.DTOs;
using Skinet_Store.DTOs.Brand;
using Skinet_Store.DTOs.Product;
using Skinet_Store.Extensions;

namespace Skinet_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(ILogger<ProductsController> logger,
                                    IUnitOfWork repo) : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger = logger;
        private readonly IUnitOfWork _repo = repo;

        [HttpGet]
        public async Task<ActionResult<PagedResultDto<ProductDto>>> GetProducts([FromQuery] GetAllProductsDto input)
        {
            var lang = HttpContext.Request.Headers["Accept-Language"].FirstOrDefault();
            var isArabic = lang?.StartsWith("ar", StringComparison.OrdinalIgnoreCase) == true; ;

            var products = await _repo.Products.GetAllProductsAsync(filterText: input.FilterText,
            brands: input.Brands, types: input.Types, skipCount: input.SkipCount, maxResultCount: input.MaxResultCount, sorting: input.Sorting);

            var productDtos = products.items.Select(p => p.ToDto(isArabic)).ToList();

            return Ok(new PagedResultDto<ProductDto>
            {
                Items = productDtos,
                TotalCount = products.count
            });
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ProductDto>> GetProduct([FromRoute] Guid id)
        {
            var lang = HttpContext.Request.Headers["Accept-Language"].FirstOrDefault();
            var isArabic = lang?.StartsWith("ar", StringComparison.OrdinalIgnoreCase) == true;

            var product = await _repo.Products.GetProductByIdAsync(id);

            if (product is null)
                return NotFound();

            return Ok(product.ToDto(isArabic));
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto productDto)
        {
            var lang = HttpContext.Request.Headers["Accept-Language"].FirstOrDefault();
            var isArabic = lang?.StartsWith("ar", StringComparison.OrdinalIgnoreCase) == true;

            var product = productDto.ToEntity();

            await _repo.Products.AddProductAsync(product);

            if (!await _repo.CommitAsync())
                return BadRequest("Failed to create product");

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product.ToDto(isArabic));
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await _repo.Products.GetProductByIdAsync(id);

            if (product is null)
                return NotFound();

            _repo.Products.DeleteProductAsync(product);

            if (!await _repo.CommitAsync())
                return BadRequest("Failed to delete product");

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductDto productDto)
        {
            var isProductExist = await _repo.Products.ProductExists(productDto.Id);

            if (!isProductExist)
                return NotFound();

            var updatedProduct = productDto.ToEntity();
            _repo.Products.UpdateProductAsync(updatedProduct);

            if (!await _repo.CommitAsync())
                return BadRequest("Failed to update product");

            return NoContent();
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<BrandDto>>> GetBrands()
        {
            var lang = HttpContext.Request.Headers["Accept-Language"].FirstOrDefault();
            var isArabic = lang?.StartsWith("ar", StringComparison.OrdinalIgnoreCase) == true;

            var brands = await _repo.Products.GetBrandsAsyns();
            var brandsDto = brands.Select(b => b?.ToDto(isArabic)).ToList();

            return Ok(brandsDto);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        {
            var lang = HttpContext.Request.Headers["Accept-Language"].FirstOrDefault();
            var isArabic = lang?.StartsWith("ar", StringComparison.OrdinalIgnoreCase) == true;

            var types = await _repo.Products.GetTypesAsync();
            var result = isArabic ? types.Select(t => t.TypeAr).ToList() : 
                                    types.Select(t => t.TypeEn).ToList();

            return Ok(result);
        }
    }
}
