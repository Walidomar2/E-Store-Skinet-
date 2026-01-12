using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<(IReadOnlyList<Product> items, int count)> GetAllProductsAsync(string? filterText, List<string>? brands, List<string>? types, 
                                                            int skipCount, int maxResultCount, string? sorting);
        Task<Product?> GetProductByIdAsync(Guid id);
        Task AddProductAsync(Product product);
        void UpdateProductAsync(Product product);
        void DeleteProductAsync(Product product);
        Task<bool> ProductExists(Guid id);
        Task<bool> SaveChangesAsync();
        Task<IReadOnlyList<string>> GetBrandsAsyns();
        Task<IReadOnlyList<string>> GetTypesAsyns();
    }
}
