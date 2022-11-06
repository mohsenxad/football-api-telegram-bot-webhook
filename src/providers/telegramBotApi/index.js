module.exports = function(
    BOT_TOKEN,
    proxyAgent,
    fetch
)
    {
        if(!BOT_TOKEN){
            throw new Error('Telegram Provider need to have API token');
        }


        const { setWebhook }  = require('./set-webhook')(
            BOT_TOKEN,
            proxyAgent,
            fetch
        );

        
        // const { sendPhoto }  = require('./send-photo')(
        //     BOT_TOKEN,
        //     proxyAgent,
        //     fetch,
        //     generateInlineKeyboardMarkup
        // );

        

        const services = Object.freeze(
            {
                setWebhook
            }
        )

        return services;

    }

