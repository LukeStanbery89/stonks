'use strict';

import { AccountInfo, BrokerProvider, BuyOrder, BuyResult, Position, SellOrder, SellResult } from "../../types";

const { BROKER, BROKER_PROVIDERS, COMMANDS } = require('../trade.config.json');

class Broker {
    private broker!: BrokerProvider;

    async buy(buyOrder: BuyOrder): Promise<BuyResult> {
        return this.invoke(COMMANDS.BUY, buyOrder);
    }

    async sell(sellOrder: SellOrder): Promise<SellResult> {
        return await this.invoke(COMMANDS.SELL, sellOrder);
    }

    async getPositions(): Promise<Position[]> {
        return await this.invoke(COMMANDS.GET_POSITIONS);
    }

    async getPosition(symbol: string): Promise<Position[]> {
        return await this.invoke(COMMANDS.GET_POSITION, symbol);
    }

    async getAccountInfo(): Promise<AccountInfo> {
        return await this.invoke(COMMANDS.GET_ACCOUNT_INFO);
    }

    async invoke(command: keyof BrokerProvider, ...args: any): Promise<any> {
        !this.broker ? await this.assignBrokerProvider(BROKER) : '';

        // TODO: Can we make this work somehow?
        // return await this.broker[command].apply(null, args);

        switch (command) {
            case COMMANDS.BUY:
                return await this.broker.buy.apply(null, args);
            case COMMANDS.SELL:
                return await this.broker.sell.apply(null, args);
            case COMMANDS.GET_POSITIONS:
                return await this.broker.getPositions.apply(null, args);
            case COMMANDS.GET_POSITION:
                return await this.broker.getPosition.apply(null, args);
            case COMMANDS.GET_ACCOUNT_INFO:
                return await this.broker.getAccountInfo.apply(null, args);
            default:
                throw new Error(`Invalid command: ${command}`);
        }
    }

    assignBrokerProvider(providerName: string): Promise<BrokerProvider> {
        return new Promise((resolve, reject) => {
            import(`./providers/${BROKER_PROVIDERS[providerName]}`).then(module => {
                this.broker = module.default;
                resolve(this.broker);
            }).catch(e => reject(e));
        });
    }
}

export default Broker;
