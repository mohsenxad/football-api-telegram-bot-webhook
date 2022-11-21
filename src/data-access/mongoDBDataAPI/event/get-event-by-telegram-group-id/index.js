const buildTranslateGetEventByTelegramGroupIdResponse = require('./src/translate-get-event-by-telegram-group-id-response');
const buildCreateGetEventByTelegramGroupIdRequest = require('./src/create-get-event-by-telegram-group-id-request');
const buildGetEventByTelegramGroupId = require('./src/get-event-by-telegram-group-id');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateGetEventByTelegramGroupIdResponse = buildTranslateGetEventByTelegramGroupIdResponse();
        const createGetEventByTelegramGroupIdRequest = buildCreateGetEventByTelegramGroupIdRequest(
            APIKEY,
            proxyAgent
        );
        const getEventByTelegramGroupId = buildGetEventByTelegramGroupId(
            APPID,
            fetch,
            createGetEventByTelegramGroupIdRequest,
            translateGetEventByTelegramGroupIdResponse
        );

        return Object.freeze(
            {
                getEventByTelegramGroupId
            }
        )
    }