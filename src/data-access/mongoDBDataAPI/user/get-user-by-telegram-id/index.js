const buildTranslateGetUserByTelegramIdResponse = require('./src/translate-get-user-by-telegram-id-response');
const buildCreateGetUserByTelegramIdRequest = require('./src/create-get-user-by-telegram-id-request');
const buildGetUserByTelegramId = require('./src/get-user-by-telegram-id');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateGetUserByTelegramIdResponse = buildTranslateGetUserByTelegramIdResponse();
        const createGetUserByTelegramIdRequest = buildCreateGetUserByTelegramIdRequest(
            APIKEY,
            proxyAgent
        );
        const getUserByTelegramId = buildGetUserByTelegramId(
            APPID,
            fetch,
            createGetUserByTelegramIdRequest,
            translateGetUserByTelegramIdResponse
        );

        return Object.freeze(
            {
                getUserByTelegramId
            }
        )
    }