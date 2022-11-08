const buildSetWebhook = require('./set-webhook');
const buildProccessMessage = require('./proccess-message');
// const buildPostChallengeOnTelegramChannel = require('./post-challenge-on-telegram-channel');

module.exports = function(
    {
        MONGODB_DATAAPI_APPID,
        MONGODB_DATAAPI_APIKEY
    },
    proxyUrl,
    {
        CHALNNEL_ID,
        BOT_TOKEN,
        WEBHOOK_URL
    }
)
    {
        const dataAccess = require('../data-access')(
            {
                MONGODB_DATAAPI_APPID,
                MONGODB_DATAAPI_APIKEY
            },
            proxyUrl
        );

        const providerServices = require('../providers')(
            BOT_TOKEN
        )

        const setWebhook = buildSetWebhook(
            providerServices
        );
        setWebhook(WEBHOOK_URL)

        const proccessMessage = buildProccessMessage(
            dataAccess,
            providerServices
        );
        
        // const postChallengeOnTelegramChannel = buildPostChallengeOnTelegramChannel(
        //     dataAccess,
        //     providerServices,
        //     CHALNNEL_ID
        // );

        const services =  Object.freeze(
            {
                setWebhook,
                proccessMessage,
                // postChallengeOnTelegramChannel
            }
        );

        return services;
    }