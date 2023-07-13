package re21.ieun.order.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import re21.ieun.member.entity.Member;
import re21.ieun.order.dto.OrderDto;
import re21.ieun.order.entity.Order;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = OrderSellMapper.class, imports = Member.class,
        builder = @Builder(disableBuilder = true))
public interface OrderMapper {

    @Mapping(target = "member", expression = "java(Member.builder().id(memberId).build())")
    Order toOrder(OrderDto.Post post, Long memberId);

    @Mapping(target = "orderId", source = "id")
    //@Mapping(target = "orderNumber", expression = "java(order.getId() + 215637)")
    @Mapping(target = "status", expression = "java(order.getStatus().getMessage())")
    OrderDto.Response toResponse(Order order);
}
