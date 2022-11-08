const buildTranslateGetChallengeByTelegramMessageIdResponse = require('./src/translate-get-challenge-by-telegram-message-id-response');
const buildCreateGetChallengeByTelegramMessageIdRequest = require('./src/create-get-challenge-by-telegram-message-id-request');
const buildGetChallengeByTelegramMessageId = require('./src/get-challenge-by-telegram-message-id');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateGetChallengeByTelegramMessageIdResponse = buildTranslateGetChallengeByTelegramMessageIdResponse();
        const createGetChallengeByTelegramMessageIdRequest = buildCreateGetChallengeByTelegramMessageIdRequest(
            APIKEY,
            proxyAgent
        );
        const getChallengeByTelegramMessageId = buildGetChallengeByTelegramMessageId(
            APPID,
            fetch,
            createGetChallengeByTelegramMessageIdRequest,
            translateGetChallengeByTelegramMessageIdResponse
        );

        return Object.freeze(
            {
                getChallengeByTelegramMessageId
            }
        )
    }