package re21.ieun.order.service;

import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.order.entity.Order;
import re21.ieun.order.entity.OrderStatus;
import re21.ieun.member.entity.Member;
import re21.ieun.order.repository.OrderRepository;
import re21.ieun.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import re21.ieun.sell.entity.Sell;
import re21.ieun.sell.service.SellService;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final SellService sellService;
    private final MemberService memberService;

    public Order createOrder(Order order) {
        verifyOrder(order);
        order.updateOrderStatus(OrderStatus.ORDER_RECEPTION);
        // 상품 옵션 재고 감소 + 상품 판매수 증가

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public Order findVerifiedOrder(Long memberId, Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));

        if (!order.getMember().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.ORDER_DOES_NOT_MATCH);
        }

        return order;
    }


    private void verifyOrder(Order order) {
        Member member = memberService.findMember(order.getMember().getMemberId());
        order.setMember(member);

        order.getOrderSells()
                .forEach(orderSell -> {
                    Sell sell = sellService.findVerifySell(orderSell.getSell().getSellId());

                  /*  Option findOption = product.getOptions().stream()
                            .filter(option -> option.getId().equals(orderProduct.getOption().getId()))
                            .findAny()
                            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.OPTION_NOT_FOUND));

                   */

                    orderSell.addSell(sell);
                    orderSell.addOrder(order);
                });

    }


    /*

    private void updateSaleAndStock(OrderProduct orderProduct) {
        if (orderProduct.getOption().getStock() < orderProduct.getCount()) {
            throw new BusinessLogicException(ExceptionCode.OUT_OF_STOCK);
        }
        orderProduct.getProduct().updateSale(orderProduct.getCount());
        orderProduct.getOption().updateStock(orderProduct.getCount());
    }

     */

    @Transactional(readOnly = true)
    public Page<Order> findByMemberId(Long memberId, Pageable pageable) {

        return orderRepository.findOrderByMemberId(memberId, pageable);
    }

    public void cancelOrder(Long memberId, Long orderId) {

        Order order = findVerifiedOrder(memberId, orderId);

        if (!order.getStatus().equals(OrderStatus.ORDER_RECEPTION)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CANCEL_ORDER);
        }

        order.updateOrderStatus(OrderStatus.ORDER_CANCELED);
    }
}
