using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ProductRepository(ApplicationContext context) : IProductRepository
    {
        private readonly ApplicationContext _context = context;

        public async Task AddProductAsync(Product product)
        {
            var result = await _context.Products.AddAsync(product);
        }

        public void DeleteProductAsync(Product product)
        {
            _context.Products.Remove(product);
        }

        public async Task<(IReadOnlyList<Product> items, int count)> GetAllProductsAsync(string? filterText, List<string>? brands, List<string>? types,
                                                                        int skipCount, int maxResultCount, string? sorting)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(filterText))
            {
                query = query.Where(p => p.Name.Contains(filterText) ||
                                    p.Description.Contains(filterText) ||
                                    p.Brand.Contains(filterText));
            }

            if (brands is not null && brands.Any())
            {
                query = query.Where(p => brands.Contains(p.Brand));
            }

            if (types is not null && types.Any())
            {
                query = query.Where(p => types.Contains(p.Type));
            }

            query = sorting switch
            {
                "price_asc" => query.OrderBy(p => p.Price),
                "price_desc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            var count = await query.CountAsync();
            var products = await query
                                .Skip(skipCount)
                                .Take(maxResultCount)
                                .ToListAsync();
            return (products, count);
        }

        public async Task<IReadOnlyList<string>> GetBrandsAsyns()
        {
            return await _context.Products
                                 .Select(p => p.Brand)
                                 .Distinct()
                                 .ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(Guid id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

            return product;
        }

        public async Task<IReadOnlyList<string>> GetTypesAsyns()
        {
            return await _context.Products
                                .Select(p => p.Type)
                                .Distinct()
                                .ToListAsync();
        }

        public async Task<bool> ProductExists(Guid id)
        {
            return await _context.Products.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            var count = await _context.SaveChangesAsync();

            return count > 0;
        }

        public void UpdateProductAsync(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
    }
}
