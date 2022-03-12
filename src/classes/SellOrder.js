import { Order } from './Order';

export class SellOrder extends Order {
    constructor(params) {
        super(params);
        this.order.side = 'sell';
    }
}