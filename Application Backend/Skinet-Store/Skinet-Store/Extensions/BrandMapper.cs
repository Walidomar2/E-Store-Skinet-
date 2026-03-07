using Core.Entities;
using Skinet_Store.DTOs.Brand;

namespace Skinet_Store.Extensions
{
    public static class BrandMapper
    {
        public static BrandDto ToDto(this Brand brand, bool isArabic)
        {
            return new BrandDto
            {
                Name = isArabic ? brand.NameAr : brand.NameEn,
                Description = isArabic ? brand.DescriptionAr : brand.DescriptionEn,
            };
        }


    }
}
