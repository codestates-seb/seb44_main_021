package re21.ieun.order.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.dto.MultiResponseDto;
import re21.ieun.dto.SingleResponseDto;
import re21.ieun.order.dto.OrderDto;
import re21.ieun.order.entity.Order;
import re21.ieun.order.mapper.OrderMapper;
import re21.ieun.order.service.OrderService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/orders")
@Validated
public class OrderController {
    private final static String ORDER_DEFAULT_URL = "/orders";
    private final OrderService orderService;
    private final OrderMapper orderMapper;

    public OrderController(OrderService orderService, OrderMapper orderMapper) {
        this.orderService = orderService;
        this.orderMapper = orderMapper;
    }

    @PostMapping
    public ResponseEntity<?> postOrder(@Valid @RequestBody OrderDto.Post orderPostDto) {
        Order order = orderService.createOrder(orderMapper.orderPostDtoToOrder(orderPostDto));
        URI location = UriCreator.createUri(ORDER_DEFAULT_URL, order.getOrderId());

        return ResponseEntity.created(location).build();
    }


    @PatchMapping("/{order-id}")
    public ResponseEntity<?> patchOrder(@PathVariable("order-id") @Positive long orderId,
                                        @Valid @RequestBody OrderDto.Patch orderPatchDto) {
        orderPatchDto.setOrderId(orderId);
        Order order =
                orderService.updateOrder(orderMapper.orderPatchDtoToOrder(orderPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(orderMapper.orderToOrderResponseDto(order))
        , HttpStatus.OK);
    }



    @GetMapping("/{order-id}")
    public ResponseEntity<?> getOrder(@PathVariable("order-id") @Positive long orderId) {
        Order order = orderService.findOrder(orderId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(orderMapper.orderToOrderResponseDto(order)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getOrders() {

        List<OrderDto.Response> orders = orderService.findOrders();

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @DeleteMapping("/{order-id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("order-id") @Positive long orderId) {

        orderService.cancelOrder(orderId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //특정 멤버 아이디로 내역 불러오는거
    @GetMapping("/member/{member-id}")
    public ResponseEntity<?> getMyOrderHistory(@PathVariable("member-id") @Positive long memberId,
                                               @Positive @RequestParam int page,
                                               @Positive @RequestParam int size) {
        Page<Order> pageOrders = orderService.getMyOrderHistoryByMemberId(memberId, page -1, size);
        List<Order> orders = pageOrders.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(orderMapper.ordersToOrderResponseDtos(orders), pageOrders),HttpStatus.OK);

    }
}
