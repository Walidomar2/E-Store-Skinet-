using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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
            query = query.Include(p => p.Brand);

            if (!string.IsNullOrEmpty(filterText))
            {
                query = query.Where(p => p.NameEn.Contains(filterText) ||
                                    p.NameAr.Contains(filterText) ||
                                    p.DescriptionAr.Contains(filterText) ||
                                    p.DescriptionEn.Contains(filterText));
            }

            if (brands is not null && brands.Any())
            {
                query = query.Where(p => p.Brand != null && (brands.Contains(p.Brand.NameAr) || brands.Contains(p.Brand.NameEn)));
            }

            if (types is not null && types.Any())
            {
                query = query.Where(p => types.Contains(p.TypeAr) || types.Contains(p.TypeEn));
            }

            query = sorting switch
            {
                "price_asc" => query.OrderBy(p => p.Price),
                "price_desc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.NameEn)
            };

            var count = await query.CountAsync();
            var products = await query
                                .Skip(skipCount)
                                .Take(maxResultCount)
                                .ToListAsync();
            return (products, count);
        }

        public async Task<IReadOnlyList<Brand?>> GetBrandsAsyns()
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

        public async Task<IReadOnlyList<(string TypeEn, string TypeAr)>> GetTypesAsync()
        {
            var pairs = await _context.Products
                .Select(p => new { p.TypeEn, p.TypeAr })
                .Distinct()
                .OrderBy(x => x.TypeEn)
                .ToListAsync();

            return pairs.Select(x => (x.TypeEn, x.TypeAr)).ToList();
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
