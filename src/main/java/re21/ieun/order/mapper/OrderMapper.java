package re21.ieun.order.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import re21.ieun.member.entity.Member;
import re21.ieun.order.dto.OrderDto;
import re21.ieun.order.dto.OrderSellDto;
import re21.ieun.order.entity.Order;
import re21.ieun.order.entity.OrderSell;
import re21.ieun.order.entity.OrderStatus;
import re21.ieun.sell.entity.Sell;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    /*
    @Mapping(source = "memberId", target = "member.memberId")
    //@Mapping(source = "categoryId", target = "category.categoryId")
    Order orderPostDtoToOrder(OrderDto.Post orderPostDto);

    @Mapping(source = "member.memberId", target = "memberId")
    //@Mapping(source = "category.categoryId", target = "categoryId")
    //@Mapping(source = "category.categoryName", target = "categoryName")
    @Mapping(source = "member.displayName", target = "displayName")
    @Mapping(source = "member.displayName", target = "displayName")
    OrderDto.Response orderToOrderResponseDto(Order order);

     */

    List<OrderDto.Response> ordersToOrderResponseDtos(List<Order> orders);

    default Order orderPostDtoToOrder(OrderDto.Post orderPostDto) {
        Order order = new Order();
        Member member = new Member();
        member.setMemberId(orderPostDto.getMemberId());

        List<OrderSell> orderSells = orderPostDto.getOrderSells().stream()
                .map(orderSellDto -> {
                    OrderSell orderSell = new OrderSell();
                    Sell sell = new Sell();
                    sell.setSellId(orderSellDto.getSellId());
                    orderSell.addOrder(order);
                    orderSell.addSell(sell);
                    orderSell.setQuantity(orderSellDto.getQuantity());
                    return orderSell;
                }).collect(Collectors.toList());
        order.setMember(member);
        order.setOrderSells(orderSells);

        return order;
    }

    default OrderDto.Response orderToOrderResponseDto(Order order){
        List<OrderSell> orderSells = order.getOrderSells();

        OrderDto.Response orderResponseDto = new OrderDto.Response();
        orderResponseDto.setOrderId(order.getOrderId());
        orderResponseDto.setMember(order.getMember());
        orderResponseDto.setOrderStatus(order.getOrderStatus());
        orderResponseDto.setCreatedAt(order.getCreatedAt());
        orderResponseDto.setOrderSells(
                orderSellsToOrderSellResponseDtos(orderSells)
        );

        return orderResponseDto;
    }

    default List<OrderSellDto.Response> orderSellsToOrderSellResponseDtos(
            List<OrderSell> orderSells) {
        return orderSells
                .stream()
                .map(orderSell -> OrderSellDto.Response
                        .builder()
                        .sellId(orderSell.getSell().getSellId())
                        .quantity(orderSell.getQuantity())
                        .price(orderSell.getSell().getPrice())
                        .build())
                .collect(Collectors.toList());
    }
}
