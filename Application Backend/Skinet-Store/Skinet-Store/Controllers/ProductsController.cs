using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skinet_Store.DTOs.Product;
using Skinet_Store.Extensions;

namespace Skinet_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(ILogger<ProductsController> logger,
                                    ApplicationContext context)
        {
            _logger = logger;
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context.Products
                .Select(p => p.ToDto())
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ProductDto>> GetProduct([FromRoute]Guid id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product is null)
                return NotFound();

            return Ok(product.ToDto());
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto productDto)
        {
            var product = productDto.ToEntity();

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product.ToDto());
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute]Guid id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product is null)
                return NotFound();
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
