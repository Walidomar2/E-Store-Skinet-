using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
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
                                    IGenericRepository<Product> repo) : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger = logger;
        private readonly IGenericRepository<Product> _repo = repo;

        [HttpGet]
        public async Task<ActionResult<PagedResultDto<ProductDto>>> GetProducts([FromQuery] GetAllProductsDto input)
        {
            var spec = new ProductSpecification(brand: input.Brand, type: input.Type);

            //var products = await _repo.ListAllAsync(spec);
            var products = await _repo.ListAsync(spec);

            var productDtos = products.items.Select(p => p.ToDto()).ToList();

            return Ok(new PagedResultDto<ProductDto>
            {
                Items = productDtos,
                TotalCount = products.count
            });
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ProductDto>> GetProduct([FromRoute] Guid id)
        {
            var product = await _repo.GetByIdAsync(id);

            if (product is null)
                return NotFound();

            return Ok(product.ToDto());
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto productDto)
        {
            var product = productDto.ToEntity();

            _repo.Add(product);

            if (!await _repo.SaveAllAsync())
                return BadRequest("Failed to create product");

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product.ToDto());
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await _repo.GetByIdAsync(id);

            if (product is null)
                return NotFound();

            _repo.Remove(product);

            if (!await _repo.SaveAllAsync())
                return BadRequest("Failed to delete product");

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductDto productDto)
        {
            var isProductExist = _repo.Exists(productDto.Id);

            if (!isProductExist)
                return NotFound();

            var updatedProduct = productDto.ToEntity();
            _repo.Update(updatedProduct);

            if (!await _repo.SaveAllAsync())
                return BadRequest("Failed to update product");


            return NoContent();
        }

        // [HttpGet("brands")]
        // public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        // {
        //     var brands = await _productRepository.GetBrandsAsyns();
        //     return Ok(brands);
        // }

        // [HttpGet("types")]
        // public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        // {
        //     var types = await _productRepository.GetTypesAsyns();
        //     return Ok(types);
        // }
    }
}
