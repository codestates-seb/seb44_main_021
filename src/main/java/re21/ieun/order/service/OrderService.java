package re21.ieun.order.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.entity.Member;
import re21.ieun.order.dto.OrderDto;
import re21.ieun.order.entity.Order;
import re21.ieun.order.entity.OrderSell;
import re21.ieun.order.entity.OrderStatus;
import re21.ieun.order.entity.TotalPriceCalculator;
import re21.ieun.order.mapper.OrderMapper;
import re21.ieun.order.repository.OrderRepository;
import re21.ieun.member.service.MemberService;
import org.springframework.stereotype.Service;
import re21.ieun.sell.service.SellService;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final SellService sellService;
    private final MemberService memberService;

    private final OrderMapper orderMapper;

    public OrderService(OrderRepository orderRepository, SellService sellService, MemberService memberService
    , OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.sellService = sellService;
        this.memberService = memberService;
        this.orderMapper = orderMapper;
    }

    public Order createOrder(Order order) {
        verifyOrder(order);
        order.updateOrderStatus(OrderStatus.ORDER_RECEPTION);
        // 상품 옵션 재고 감소 + 상품 판매수 증가

        totalPrice(order);

        return orderRepository.save(order);
    }

    // 주문 수정하기
    public Order updateOrder(Order order) {
        Order findOrder = findVerifiedOrder(order.getOrderId());

        Optional.ofNullable(order.getOrderStatus())
                .ifPresent(orderStatus -> findOrder.setOrderStatus(orderStatus));
        /*
        Optional.ofNullable(order.getOrderSells())
                .ifPresent(orderSells -> findOrder.setOrderSells());


         */
        return orderRepository.save(findOrder);
    }

    private Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order findOrder =
                optionalOrder.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return findOrder;
    }

    public Order findOrder(long orderId) {
        return findVerifiedOrder(orderId);
    }

    private void verifyOrder(Order order) {
        // 회원이 존재하는지 확인
        memberService.findMember(order.getMember().getMemberId());

        // 커피가 존재하는지 확인
        order.getOrderSells().stream()
                .forEach(orderSell -> sellService.
                        findVerifySell(orderSell.getSell().getSellId()));
    }

    public List<OrderDto.Response> findOrders() {

        List<Order> orders = orderRepository.findAll();

        return orderMapper.ordersToOrderResponseDtos(orders);
    }

    public void cancelOrder(long orderId) {
        Order findOrder = findVerifiedOrder(orderId);


        int step = findOrder.getOrderStatus().getStepNumber();

        // OrderStatus의 step이 2 이상일 경우(ORDER_CONFIRM)에는 주문 취소가 되지 않도록한다.
        if (step >= 2) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ORDER);
        }
        findOrder.setOrderStatus(OrderStatus.ORDER_CANCELED);
        orderRepository.delete(findOrder);
    }

    //특정 멤버 오더 내역, 페이지네이션

    public Page<Order> getMyOrderHistoryByMemberId(Long memberId, int page, int size) {
        Member member = memberService.findMember(memberId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderId").descending());
        return orderRepository.findByMember(member, pageable);
    }

    /*
    // 총 가격
    private void totalPrice(Order order) {
        int totalPrice = 0;
        for (OrderSell orderSell : order.getOrderSells()) {
            totalPrice += orderSell.getSell().getPrice() * orderSell.getQuantity();
        }
        order.setTotalPrice(totalPrice);
    }

     */
    private void totalPrice(Order order) {
        int totalPrice = TotalPriceCalculator.calculateTotalPrice(order.getOrderSells());
        order.setTotalPrice(totalPrice);
    }
}
