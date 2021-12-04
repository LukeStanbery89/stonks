const {
    WHITELIST,
    BLACKLIST,
    MAX_SYMBOLS_PER_JOB,
}: {
    WHITELIST: string[],
    BLACKLIST: string[],
    MAX_SYMBOLS_PER_JOB: number,
} = require('./trade-config.json');

const getBuyList = () => {
    const tradeList: string[] = [
        ...WHITELIST,
        ...getBuyableSymbols(),
    ];
    const filteredTradeList: string[] = tradeList.filter((symbol: string) => !BLACKLIST.includes(symbol));
    return filteredTradeList.slice(0, MAX_SYMBOLS_PER_JOB);
};

// TODO
const getBuyableSymbols = (): string[] => {
    return [
        "PYPL",
        "AAA",
        "BBB",
        "CCC",
        "DDD",
        "EEE",
        "FFF",
        "GGG",
        "HHH",
        "III",
        "JJJ",
        "KKK",
        "LLL",
        "MMM",
        "NNN",
        "OOO",
        "PPP",
        "QQQ",
        "RRR",
        "SSS",
        "TTT",
        "UUU",
        "VVV",
        "WWW",
        "XXX",
        "YYY",
        "ZZZ",
    ];
};

module.exports = {
    getBuyList,
};