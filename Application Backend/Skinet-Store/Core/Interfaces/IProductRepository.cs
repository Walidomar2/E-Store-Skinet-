using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<IReadOnlyList<Product>> GetAllProductsAsync(string? filterText);
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
