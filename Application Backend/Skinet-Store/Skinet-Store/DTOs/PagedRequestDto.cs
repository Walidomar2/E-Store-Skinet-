namespace Skinet_Store.DTOs
{
    public class PagedRequestDto
    {
        private const int MaxPageSize = 100;

        public int SkipCount { get; set; } = 0;

        private int _maxResultCount = 10;
        public int MaxResultCount
        {
            get => _maxResultCount;
            set => _maxResultCount = value > MaxPageSize ? MaxPageSize : value;
        }
        public string? Sorting { get; set; }
    }
}
