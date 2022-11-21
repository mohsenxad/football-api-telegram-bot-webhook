const buildSetWebhook = require('./set-webhook');
const buildProccessMessage = require('./proccess-message');
const buildProcessCallbackQuery = require('./process-callback-query');
const buildProcessNewMemberInGroup = require('./process-new-member-in-group');

const buildIsUserInTelegramGroup = require('./is-user-in-telegram-group');
const buildGetOrCreateUser = require('./get-or-create-user');
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

        const processNewMemberInGroup = buildProcessNewMemberInGroup(
            dataAccess,
            providerServices
        )

       

        const getOrCreateUser = buildGetOrCreateUser(
            dataAccess
        )

        const isUserInTelegramGroup = buildIsUserInTelegramGroup(
            providerServices 
        )

        const processCallbackQuery = buildProcessCallbackQuery(
            dataAccess,
            providerServices,
            isUserInTelegramGroup
        );

        const proccessMessage = buildProccessMessage(
            dataAccess,
            providerServices,
            isUserInTelegramGroup,
            processNewMemberInGroup,
            processCallbackQuery
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