import { Order } from './Order';

export class BuyOrder extends Order {
    constructor(params) {
        super(params);
        this.order.side = 'buy';
    }
}