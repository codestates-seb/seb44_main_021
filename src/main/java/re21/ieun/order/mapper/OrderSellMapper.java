package re21.ieun.order.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import re21.ieun.order.dto.OrderSellDto;
import re21.ieun.order.entity.OrderSell;
import re21.ieun.sell.entity.Sell;
/*
@Mapper(componentModel = "spring")
public interface OrderSellMapper {

    @Mapping(target = "sell", expression = "java(Sell.builder().id(post.getOrderSellId()).build())")
    OrderSell toOrderSell(OrderSellDto.Post post);

    OrderSell toOrderSell(OrderSellDto.Patch patch);

    //@Mapping(target = "sellId", source = "sell")
    @Mapping(source = "sell.sellId", target = "sellId")
//  @Mapping(target = "brandName", source = "product.seller.member.nickname")
    //@Mapping(target = ".", source = "sell")
    //@Mapping(target = ".", source = "sell")
    OrderSellDto.Response toResponse(OrderSell orderSell);
}


 */