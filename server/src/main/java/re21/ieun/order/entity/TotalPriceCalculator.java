package re21.ieun.order.entity;

import java.util.List;

public class TotalPriceCalculator {
    public static int calculateTotalPrice(List<OrderSell> orderSells) {
        int totalPrice = 0;
        for (OrderSell orderSell : orderSells) {
            totalPrice += orderSell.getSell().getPrice() * orderSell.getQuantity();
        }
        return totalPrice;
    }
}
