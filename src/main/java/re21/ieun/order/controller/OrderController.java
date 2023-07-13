package re21.ieun.order.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.dto.SingleResponseDto;
import re21.ieun.order.dto.OrderDto;
import re21.ieun.order.entity.Order;
import re21.ieun.order.mapper.OrderMapper;
import re21.ieun.order.service.OrderService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

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

    /*
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto.Response postOrder(@Positive Long memberId,
                                       @Valid @RequestBody OrderDto.Post post) {
        // post => productCartId 추출해서 cart 에서 해당 Id 삭제
        Order saveOrder = orderService.createOrder(orderMapper.toOrder(post, memberId));

        return orderMapper.toResponse(saveOrder);
    }


    @GetMapping
    public PageResponseDto<OrderDto.Response> getOrders(@Positive Long memberId,
                                                        @PageableDefault(size = 20, sort = "createdAt",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Order> orders = orderService.findByMember_Id(memberId, pageable);

        return PageResponseDto.of(orders.map(mapper::toResponse));
    }



    @GetMapping("/{order-id}")
    public OrderDto.Response getOrder(@Positive Long memberId,
                                      @Positive @PathVariable("order-id") Long orderId) {
        Order order = orderService.findVerifiedOrder(memberId, orderId);

        return orderMapper.toResponse(order);
    }

    @DeleteMapping("/{order-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String cancelOrder(@Positive Long memberId,
                              @Positive @PathVariable("order-id") Long orderId) {
        orderService.cancelOrder(memberId, orderId);
        return "Cancel order";
    }

     */

    @PostMapping
    public ResponseEntity<?> postOrder(@Valid @RequestBody OrderDto.Post orderPostDto) {
        Order order = orderService.createOrder(orderMapper.orderPostDtoToOrder(orderPostDto));
        URI location = UriCreator.createUri(ORDER_DEFAULT_URL, order.getOrderId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{order-id}")
    public ResponseEntity getOrder(@PathVariable("order-id") @Positive long orderId) {
        Order order = orderService.findOrder(orderId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(orderMapper.orderToOrderResponseDto(order)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{order-id}")
    public ResponseEntity cancelOrder(@PathVariable("order-id") @Positive long orderId) {
        orderService.cancelOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
