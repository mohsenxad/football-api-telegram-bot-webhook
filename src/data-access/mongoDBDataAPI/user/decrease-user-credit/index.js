const buildTranslateDecreaseUserCreditResponse = require('./src/translate-decrease-user-credit-response');
const buildCreateDecreaseUserCreditRequest = require('./src/create-decrease-user-credit-request');
const buildDecreaseUserCredit = require('./src/decrease-user-credit');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateDecreaseUserCreditResponse = buildTranslateDecreaseUserCreditResponse();
        const createDecreaseUserCreditRequest = buildCreateDecreaseUserCreditRequest(
            APIKEY,
            proxyAgent
        );
        const decreaseUserCredit = buildDecreaseUserCredit(
            APPID,
            fetch,
            createDecreaseUserCreditRequest,
            translateDecreaseUserCreditResponse
        );

        return Object.freeze(
            {
                decreaseUserCredit
            }
        )
    }