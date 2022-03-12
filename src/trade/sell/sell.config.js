import { noOpenOrder, omitBlacklistedSecurities, securityNotTradedToday } from '../strategies/eval-functions/shared-eval-functions.js';
import testStrategy from '../strategies/sell/test-strategy.js';

export default {
    defaultEvalFunctions: [
        omitBlacklistedSecurities,
        securityNotTradedToday,
        noOpenOrder,
    ],
    strategy: testStrategy,
};
