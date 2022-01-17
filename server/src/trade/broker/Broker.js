'use strict';

import tradeConfig from '../trade.config.json';
import brokerConfig from './broker.config.json';

export default class Broker {
    constructor() {
        this._broker;
    }

    async buy(buyOrder) {
        return this._invoke(brokerConfig.commands.BUY, buyOrder);
    }

    async sell(sellOrder) {
        return await this._invoke(brokerConfig.commands.SELL, sellOrder);
    }

    async getPositions() {
        return await this._invoke(brokerConfig.commands.GET_POSITIONS);
    }

    async getPosition(symbol) {
        return await this._invoke(brokerConfig.commands.GET_POSITION, symbol);
    }

    async getAccountInfo() {
        return await this._invoke(brokerConfig.commands.GET_ACCOUNT_INFO);
    }

    async _invoke(command, ...args) {
        !this._broker ? await this._assignBrokerProvider(tradeConfig.broker) : '';

        if (this._broker[command]) {
            return await this._broker[command](args);
        } else {
            throw new Error(`Invalid broker command: ${command}`);
        }
    }

    _assignBrokerProvider(providerName) {
        return new Promise((resolve, reject) => {
            import("./providers/" + tradeConfig.brokerProviders[providerName] + "/" + tradeConfig.brokerProviders[providerName]).then(module => {
                this._broker = module;
                return resolve();
            }).catch(e => reject(e));
        });
    }
}