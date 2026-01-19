using Core.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationContext _context;
        private IProductRepository? _productRepository;
        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
        }
        public IProductRepository Products
                => _productRepository ??= new ProductRepository(_context);
        public async Task<bool> CommitAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}