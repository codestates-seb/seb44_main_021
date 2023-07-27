package re21.ieun.sell.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import re21.ieun.sell.dto.SellPatchDto;
import re21.ieun.sell.dto.SellPostDto;
import re21.ieun.sell.dto.SellResponseDto;
import re21.ieun.sell.entity.Sell;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SellMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "sellCategoryId", target = "sellCategory.sellCategoryId")
    Sell sellPostDtoToSell(SellPostDto sellPostDto);

    Sell sellPatchDtoToSell(SellPatchDto sellPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.displayName", target = "displayName")
    @Mapping(source = "sellCategory.sellCategoryId", target = "sellCategoryId")
    @Mapping(source = "sellCategory.sellCategoryName", target = "sellCategoryName")
    SellResponseDto sellToSellResponseDto(Sell sell);

    List<SellResponseDto> sellToSellResponseDtos(List<Sell> sells);
}
