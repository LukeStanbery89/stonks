export type Source = {
    name: string,
    url: string,
    selectors: {
        row: string,
        rating: string,
        symbol: string,
        drillDownLink: string,
    },
    constants: {
        BULLISH: string,
        NEUTRAL: string,
        BEARISH: string,
    };
};
