'use strict';

import { BuyOrder, BuyResult, SellOrder, SellResult, Position, AccountInfo } from "../trade.types";
import { BrokerProvider } from "./broker.types";


const { broker, brokerProviders } = require('../trade.config.json');
const { commands } = require('./broker.config.json');

class Broker {
    private broker!: BrokerProvider;

    async buy(buyOrder: BuyOrder): Promise<BuyResult> {
        return this.invoke(commands.BUY, buyOrder);
    }

    async sell(sellOrder: SellOrder): Promise<SellResult> {
        return await this.invoke(commands.SELL, sellOrder);
    }

    async getPositions(): Promise<Position[]> {
        return await this.invoke(commands.GET_POSITIONS);
    }

    async getPosition(symbol: string): Promise<Position[]> {
        return await this.invoke(commands.GET_POSITION, symbol);
    }

    async getAccountInfo(): Promise<AccountInfo> {
        return await this.invoke(commands.GET_ACCOUNT_INFO);
    }

    private async invoke(command: keyof BrokerProvider, ...args: any): Promise<any> {
        !this.broker ? await this.assignBrokerProvider(broker) : '';

        if (this.broker[command]) {
            return await this.broker[command](args);
        } else {
            throw new Error(`Invalid broker command: ${command}`);
        }
    }

    private assignBrokerProvider(providerName: string): Promise<BrokerProvider> {
        return new Promise((resolve, reject) => {
            import(`./providers/${brokerProviders[providerName]}/${brokerProviders[providerName]}`).then(module => {
                this.broker = module.default;
                resolve(this.broker);
            }).catch(e => reject(e));
        });
    }
}

export default Broker;
