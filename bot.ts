require('dotenv').config();
const { Bot } = require("grammy");
const { shortAddress, shortDate } = require("./utils/functions");

const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = require('recharts');


import axios from 'axios';

const bot = new Bot(process.env.API_KEY_TELEGRAM_BOT);

// Handle the /start command.
bot.command("start", async (ctx: any) => {
    try {
        const html: any = `
        <b>Welcome to Thomas Ken's Bot!</b>\n
If you need help, please enter "/help".
Enjoy your time...Thanks.
      `;

        // Send the token information as HTML to the user
        await ctx.reply(html, { parse_mode: "HTML" });

    }
    catch (error) {
        console.log("error-price:", error);
    }
});

bot.command("help", async (ctx: any) => {
    try {
        const html: any = `
        <b>Commands:</b>\n
<i>/info</i>: Display MEVFree's information.
<i>/price</i>: Display MEVFree's price.
<i>/graph</i>: Coming soon.
<i>/help</i>: Display command instructions.
      `;

        // Send the token information as HTML to the user
        await ctx.reply(html, { parse_mode: "HTML" });
    }
    catch (error) {
        console.log("error-price:", error);
    }
});


bot.command('graph', async (ctx: any) => {
    try {
        // Fetch token price data from CoinMarketCap API
        const tokenPriceData: any = await fetchTokenPriceDataCoinMarketcap();

        // Prepare data for the chart
        const chartData: any = tokenPriceData.map((price: any, index: any) => ({
            date: new Date().toLocaleTimeString(),
            price,
        }));

        const data: any = [
            {
                name: 'Sun',
                price: 1,
                trading: 3908,
                staked: 2000,
            },
            {
                name: 'Mon',
                price: 0.4,
                trading: 2400,
                staked: 2400,
            },
            {
                name: 'Tue',
                price: 0.8,
                trading: 1398,
                staked: 2210,
            },
            {
                name: 'Wed',
                price: 0.5,
                trading: 3908,
                staked: 2000,
            },
            {
                name: 'Thr',
                price: 1.2,
                trading: 4800,
                staked: 1881,
            },
            {
                name: 'Fri',
                price: 0.1,
                trading: 2400,
                staked: 2400,
            },
            {
                name: 'Sat',
                price: 0.8,
                trading: 1398,
                staked: 2210,
            },
        ];



        // Create the chart component
        //         const chart: any = (
        //             <AreaChart width= { 400} height = { 300} data = { data } margin = {{ top: 30, right: 20, left: -20, bottom: 0, }}> <XAxis dataKey={ "name"} /> <YAxis />
        //             < Tooltip />
        // <Area type={ "monotone"} dataKey = { "price"} stroke = { "#333"} fill = { "#93aebc"} />
        // </AreaChart>
        // );

        // Send the chart as a photo to the user
        // await ctx.replyWithPhoto({ source: await chartToImage(chart) });
        //           } catch (error) {
        //     console.error('Error fetching token price data:', error);
        //     await ctx.reply('An error occurred while fetching token price data.');
        // }
    }
    catch (error) {
        console.log(error);
    }
});


bot.command('price', async (ctx: any) => {
    try {
        // Fetch token price data from CoinMarketCap API
        const [_, tokenPrice]: any = await fetchTokenPriceDataCoinMarketcap();
        await ctx.reply(`MEVFree Price: $${tokenPrice}`);
    }
    catch (error) {
        console.log("error-price:", error);
    }
});


bot.command('info', async (ctx: any) => {
    try {
        // Fetch token price data from CoinMarketCap API
        const [tokenData]: any = await fetchTokenPriceDataCoinMarketcap();

        // Format the token information as HTML
        const html: any = `
    <b>${tokenData.name} Information</b>\n
Name: ${tokenData.name}
Symbol: ${tokenData.symbol}
Price: $${tokenData.quote.USD.price.toFixed(5)}
CMC Rank: ${tokenData.cmc_rank}
Address: <a href="https://etherscan.io/token/${tokenData.platform.token_address}"><u>${shortAddress(tokenData.platform.token_address)}</u></a>
Max Supply: ${tokenData.max_supply}
Circulating Supply: ${tokenData.circulating_supply}
Total Supply: ${tokenData.total_supply}
Date Added: <i>${shortDate(tokenData.date_added)}</i>
  `;

        // Send the token information as HTML to the user
        await ctx.reply(html, { parse_mode: "HTML" });

    }
    catch (error) {
        console.log("error-price:", error);
    }
});


// Function to fetch token price data from CoinMarketCap API
const fetchTokenPriceDataCoinMarketcap = async () => {
    const apiKey = '76c1bf3c-0c6f-45ef-a86f-7768542f5b1e';
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
        console.log("tokenData:", tokenData)
        const tokenPrice = tokenData.quote.USD.price;

        console.log("coinmarketcap tokenPrice:", tokenPrice);
        return [tokenData, tokenPrice];
    }
    catch (error) {
        console.log("error-coinmarketcap api:", error)
    }
}

// Function to convert a React component to an image buffer
// async function chartToImage(chart: JSX.Element) {
//     const puppeteer = require('puppeteer');
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.setContent(`
//     <html>
//       <body>
//         <div id="chart">${renderToStaticMarkup(chart)}</div>
//       </body>
//     </html>
//   `);

//     const elementHandle = await page.$('#chart');
//     const imageBuffer = await elementHandle.screenshot();

//     await browser.close();

//     return imageBuffer;
// }

bot.start();


