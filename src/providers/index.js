var fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

module.exports = function(
    BOT_TOKEN,
    proxyUrl
){
    

    let proxyAgent = undefined;
    if(proxyUrl){
        proxyAgent = new HttpsProxyAgent(proxyUrl);
    }

    const telegramBotServices = require('./telegramBotApi')(
        BOT_TOKEN,
        proxyAgent,
        fetch
    );


    return Object.freeze(
        {
            telegramBot: telegramBotServices
        }
    )
}