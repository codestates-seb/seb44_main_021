package re21.ieun.upcycling.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import re21.ieun.category.entity.Category;
import re21.ieun.upcycling.dto.UpcyclingPatchDto;
import re21.ieun.upcycling.dto.UpcyclingPostDto;
import re21.ieun.upcycling.dto.UpcyclingResponseDto;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UpcyclingMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "categoryId", target = "category.categoryId")
    Upcycling upcyclingPostDtoToUpcycling(UpcyclingPostDto upcyclingPostDto);

    Upcycling upcyclingPatchDtoToUpcycling(UpcyclingPatchDto upcyclingPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "category.categoryId", target = "categoryId")
    @Mapping(source = "category.categoryName", target = "categoryName")
    UpcyclingResponseDto upcyclingToUpcyclingResponseDto(Upcycling upcycling);

    List<UpcyclingResponseDto> upcyclingToUpcyclingResponseDtos(List<Upcycling> upcyclings);


}
