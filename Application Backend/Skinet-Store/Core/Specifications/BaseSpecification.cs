using System.Linq.Expressions;
using Core.Interfaces;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        private readonly Expression<Func<T, bool>>? _Criteria;
        public BaseSpecification(Expression<Func<T, bool>>? criteria)
        {
            _Criteria = criteria;
        }

        protected BaseSpecification() : this(null) { }
        public Expression<Func<T, bool>>? Criteria => _Criteria;
    }
}