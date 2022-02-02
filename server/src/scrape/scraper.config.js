export default {
    sources: [
        {
            name: 'yahoo',
            url: 'https://finance.yahoo.com/research?report_type=Analyst%20Report',
            selectors: {
                row: '#report-table table > tbody > tr',
                symbol: 'td:nth-child(2) > a',
                rating: 'td:first-child > button> div:nth-child(2) > div > div > div',
                drillDownLink: 'td:nth-child(2) > a'
            },
            constants: {
                BULLISH: 'BULLISH',
                NEUTRAL: 'NEUTRAL',
                BEARISH: 'BEARISH'
            }
        }
    ]
};
