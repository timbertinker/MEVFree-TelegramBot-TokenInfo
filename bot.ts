require('dotenv').config();
const { Bot, session } = require("grammy");
const { shortAddress, shortDate, fetchTokenData } = require("./utils/functions");
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = require('recharts');

const bot = new Bot(process.env.API_KEY_TELEGRAM_BOT);

// Handle the /start command.
// bot.command("start", async (ctx: any) => {
//     try {
//     const html: any = `
//     <b>Welcome to Thomas Ken's Bot!</b>\n
// If you need help, please enter "/help".
// Enjoy your time...Thanks.
//   `;

//     // Send the token information as HTML to the user
//     await ctx.reply(html, { parse_mode: "HTML" });

//     }
//     catch (error) {
//         console.log("error-price:", error);
//     }
// });


bot.use(session());

bot.use(async (ctx: any, next: any) => {
    // Your code to handle incoming messages
    await next();
});


bot.on('message', async (ctx: any) => {
    var currentDate = new Date();
    var currentTime = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
    console.log(`Event: ${ctx.message.text} (${currentTime})`)
    try {
        if (ctx.message.text === '/start') {
            const html: any = `
            <b>Welcome to Thomas Ken's Bot!</b>\n
If you need help, please enter "/help".
Enjoy your time...Thanks.
          `;

            // Send the token information as HTML to the user
            await ctx.reply(html, { parse_mode: "HTML" });
        }
        else if (ctx.message.text === '/help') {
            const html: any = `
            <b>Commands:</b>\n
<i><b>/start</b></i>: Start a bot.
<i><b>/info</b></i>: Display MEVFree's information.
<i><b>/price</b></i>: Display MEVFree's price.
<i><b>/graph</b></i>: Coming soon.
<i><b>/help</b></i>: Display command instructions.
          `;

            // Send the token information as HTML to the user
            await ctx.reply(html, { parse_mode: "HTML" });
        }
        else if (ctx.message.text === '/price') {
            const [_, tokenPrice]: any = await fetchTokenData();
            await ctx.reply(`MEVFree Price: $${tokenPrice}`);
        }
        else if (ctx.message.text === '/info') {
            // Fetch token price data from CoinMarketCap API
            const [tokenData]: any = await fetchTokenData();

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
        else if (ctx.message.text === '/graph') {
            await ctx.reply(`Coming soon, please wait!`);

            const tokenPriceData: any = await fetchTokenData();

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
        }
        else {
            await ctx.reply("This command is not listed in help.");
        }
    }

    catch (error) {
        console.log("error-telegrambot:", error)
    }
});


bot.start();


