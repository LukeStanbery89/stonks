import { noOpenOrder, omitBlacklistedSecurities } from '../strategies/eval-functions/shared-eval-functions.js';
import testStrategy from '../strategies/sell/test-strategy.js';
import testStrategy1 from '../strategies/sell/test-strategy-1.js';

export default {
    defaultEvalFunctions: [
        omitBlacklistedSecurities,
        noOpenOrder,
    ],
    strategies: [
        testStrategy,
        testStrategy1,
    ],
};
