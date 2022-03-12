import { securityIsNotAlreadyOwned } from '../strategies/eval-functions/buy-eval-functions.js';
import { noOpenOrder, omitBlacklistedSecurities, securityNotTradedToday } from '../strategies/eval-functions/shared-eval-functions.js';
import testStrategy from '../strategies/buy/test-strategy.js';

export default {
    defaultEvalFunctions: [
        omitBlacklistedSecurities,
        securityNotTradedToday,
        securityIsNotAlreadyOwned,
        noOpenOrder,
    ],
    strategy: testStrategy,
};
