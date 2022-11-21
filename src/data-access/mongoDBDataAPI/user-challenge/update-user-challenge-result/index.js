const buildUpdateUserChallengeResult = require('./src/update-user-challenge-result');
const buildCreateUpdateUserChallengeResultRequest = require('./src/create-update-user-challenge-result-request');
const buildTranslateUpdateUserChallengeResultResponse = require('./src/translate-update-user-challenge-result-response');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateUpdateUserChallengeResultResponse = buildTranslateUpdateUserChallengeResultResponse();
        const createUpdateUserChallengeResultRequest = buildCreateUpdateUserChallengeResultRequest(
            APIKEY,
            proxyAgent
        );
        const updateUserChallengeResult = buildUpdateUserChallengeResult(
            APPID,
            fetch,
            createUpdateUserChallengeResultRequest,
            translateUpdateUserChallengeResultResponse
        );

        return Object.freeze(
            {
                updateUserChallengeResult
            }
        )
    }