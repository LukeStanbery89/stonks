import { securityIsNotAlreadyOwned } from '../strategies/eval-functions/buy-eval-functions.js';
import { noOpenOrder, omitBlacklistedSecurities } from '../strategies/eval-functions/shared-eval-functions.js';
import testStrategy from '../strategies/buy/test-strategy.js';
import testStrategy1 from '../strategies/buy/test-strategy-1.js';

export default {
    defaultEvalFunctions: [
        omitBlacklistedSecurities,
        securityIsNotAlreadyOwned,
        noOpenOrder,
    ],
    strategies: [
        testStrategy,
        testStrategy1,
    ],
};
