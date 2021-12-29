'use strict';

import { BuyOrder, BuyResult, SellOrder, SellResult, Position, AccountInfo } from "../trade.types";
import { BrokerProvider } from "./broker.types";


const { BROKER, BROKER_PROVIDERS } = require('../trade.config.json');
const { COMMANDS } = require('./broker.config.json');

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

    private async invoke(command: keyof BrokerProvider, ...args: any): Promise<any> {
        !this.broker ? await this.assignBrokerProvider(BROKER) : '';

        if (this.broker[command]) {
            return await this.broker[command](args);
        } else {
            throw new Error(`Invalid broker command: ${command}`);
        }
    }

    private assignBrokerProvider(providerName: string): Promise<BrokerProvider> {
        return new Promise((resolve, reject) => {
            import(`./providers/${BROKER_PROVIDERS[providerName]}/${BROKER_PROVIDERS[providerName]}`).then(module => {
                this.broker = module.default;
                resolve(this.broker);
            }).catch(e => reject(e));
        });
    }
}

export default Broker;
