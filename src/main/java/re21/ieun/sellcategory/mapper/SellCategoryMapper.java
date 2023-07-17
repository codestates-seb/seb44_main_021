package re21.ieun.sellcategory.mapper;

import org.mapstruct.Mapper;
import re21.ieun.sell.dto.SellPatchDto;
import re21.ieun.sell.entity.Sell;
import re21.ieun.sellcategory.dto.SellCategoryDto;
import re21.ieun.sellcategory.entity.SellCategory;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SellCategoryMapper {

    SellCategory sellcategoryPostDtotoSellCategory(SellCategoryDto.Post sellcategoryPostDto);

    Sell sellPatchDtoToSell(SellPatchDto sellPatchDto);


    SellCategoryDto.Response sellcategoryToCategoryResponseDto(SellCategory sellcategory);

    List<SellCategoryDto.Response> sellcategoryToSellCategoryResponseDtos(List<SellCategory> sellcategories);
}
