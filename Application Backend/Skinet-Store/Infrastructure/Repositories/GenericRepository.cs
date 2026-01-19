using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GenericRepository<T>(ApplicationContext context) : IGenericRepository<T> where T : BaseEntity
    {
        public void Add(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public bool Exists(Guid id)
        {
            return context.Set<T>().Any(x => x.Id == id);
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<T?> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<(IReadOnlyList<T> items, int count)> ListAllAsync()
        {
            var items = await context.Set<T>().ToListAsync();

            return (items, items.Count);
        }

        public async Task<(IReadOnlyList<T> items, int count)> ListAsync(ISpecification<T> spec)
        {
            var list = await ApplySpecification(spec).ToListAsync();

            return (list, list.Count);
        }

        public void Remove(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(T entity)
        {
            context.Set<T>().Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(context.Set<T>().AsQueryable(), spec);
        }
    }
}