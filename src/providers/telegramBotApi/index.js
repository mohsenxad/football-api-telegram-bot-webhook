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

        
        const { answerCallbackQuery }  = require('./answer-callback-query')(
            BOT_TOKEN,
            proxyAgent,
            fetch
        );

        

        const services = Object.freeze(
            {
                setWebhook,
                answerCallbackQuery
            }
        )

        return services;

    }

