import { securityIsNotAlreadyOwned } from '../strategies/buy/common/common-evals.js';
import { noOpenOrder, omitBlacklistedSecurities, securityNotTradedToday } from '../strategies/shared/common/common-evals.js';
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
