namespace Skinet_Store.DTOs.Product
{
    public class GetAllProductsDto : PagedRequestDto
    {
        public string? FilterText { get; set; }
        public List<string>? Brands { get; set; }
        public List<string>? Types { get; set; }
    }
}
