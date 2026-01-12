namespace Skinet_Store.DTOs
{
    public class PagedResultDto <T> where T : class
    {
        public IReadOnlyList<T> Items { get; set; } = [];
        public int TotalCount { get; set; }
    }
}
