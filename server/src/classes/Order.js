import tradeConfig from '../trade/trade.config';

export class Order {
    order = {};

    constructor(params) {
        this.order.symbol = params.symbol;
        this.order.type = params.type || tradeConfig.orderType;
        this.order.qty = params.qty;
        this.order.notional = params.notional;
    }

    read() {
        return this.order;
    }
}
