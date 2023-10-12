import axios from 'axios';

const shortAddress = (address: any) => {
    return address?.slice(0, 6) + "..." + address?.slice(-4);
}

const shortDate = (date: any) => {
    return date?.slice(0, 10);
}

// Function to fetch token price data from CoinMarketCap API
const fetchTokenData = async () => {
    const apiKey = process.env.API_KEY_COINMARKETCAP;
    const tokenSymbol = 'MEVFree';
    try {
        const response = await axios.get(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokenSymbol}`,
            {
                headers: {
                    'X-CMC_PRO_API_KEY': apiKey,
                },
            }
        );
        const tokenData = response.data.data[tokenSymbol.toUpperCase()];
        // console.log("tokenData:", tokenData)
        const tokenPrice = tokenData.quote.USD.price;
        return [tokenData, tokenPrice];
    }
    catch (error) {
        console.log("error-coinmarketcap api:", error)
    }
}

module.exports = {
    shortAddress: shortAddress,
    shortDate: shortDate,
    fetchTokenData: fetchTokenData
};