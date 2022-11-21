const buildTranslateIncreaseUserCreditResponse = require('./src/translate-increase-user-credit-response');
const buildCreateIncreaseUserCreditRequest = require('./src/create-increase-user-credit-request');
const buildIncreaseUserCredit = require('./src/increase-user-credit');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateIncreaseUserCreditResponse = buildTranslateIncreaseUserCreditResponse();
        const createIncreaseUserCreditRequest = buildCreateIncreaseUserCreditRequest(
            APIKEY,
            proxyAgent
        );
        const increaseUserCredit = buildIncreaseUserCredit(
            APPID,
            fetch,
            createIncreaseUserCreditRequest,
            translateIncreaseUserCreditResponse
        );

        return Object.freeze(
            {
                increaseUserCredit
            }
        )
    }