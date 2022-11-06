const buildSetWebhook = require('./set-webhook');
// const buildGetAllChallengeByEvent = require('./get-all-challenge-by-event');
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

        const setWebhook = buildSetWebhook();
        //setWebhook(WEBHOOK_URL)
        // const getAllChallengeByEvent = buildGetAllChallengeByEvent(dataAccess);
        
        // const postChallengeOnTelegramChannel = buildPostChallengeOnTelegramChannel(
        //     dataAccess,
        //     providerServices,
        //     CHALNNEL_ID
        // );

        const services =  Object.freeze(
            {
                setWebhook,
                // getAllChallengeByEvent,
                // postChallengeOnTelegramChannel
            }
        );

        return services;
    }