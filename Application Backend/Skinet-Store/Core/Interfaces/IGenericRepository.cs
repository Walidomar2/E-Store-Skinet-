using Core.Entities;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T?> GetByIdAsync(Guid id);
        Task<(IReadOnlyList<T> items, int count)> ListAllAsync();
        void Add(T entity);
        void Remove(T entity);
        void Update(T entity);
        Task<bool> SaveAllAsync();
        bool Exists(Guid id);
    }
}