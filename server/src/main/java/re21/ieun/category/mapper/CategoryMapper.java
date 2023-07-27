package re21.ieun.category.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import re21.ieun.category.dto.CategoryDto;
import re21.ieun.category.entity.Category;
import re21.ieun.upcycling.dto.UpcyclingPatchDto;
import re21.ieun.upcycling.dto.UpcyclingResponseDto;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category categoryPostDtotoCategory(CategoryDto.Post categoryPostDto);

    Upcycling upcyclingPatchDtoToUpcycling(UpcyclingPatchDto upcyclingPatchDto);


    CategoryDto.Response categoryToCategoryResponseDto(Category category);

    List<CategoryDto.Response> categoryToCategoryResponseDtos(List<Category> categories);
}
