import { noOpenOrder, omitBlacklistedSecurities, securityNotTradedToday } from '../strategies/shared/common/common-evals.js';
import testStrategy from '../strategies/sell/test-strategy.js';

export default {
    defaultEvalFunctions: [
        omitBlacklistedSecurities,
        securityNotTradedToday,
        noOpenOrder,
    ],
    strategy: testStrategy,
};
