const buildAddUserChallenge = require('./src/add-user-challenge');
const buildCreateAddUserChallengeRequest = require('./src/create-add-user-challenge-request');
const buildTranslateAddUserChallengeResponse = require('./src/translate-add-user-challenge-response');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateAddUserChallengeResponse = buildTranslateAddUserChallengeResponse();
        const createAddUserChallengeRequest = buildCreateAddUserChallengeRequest(
            APIKEY,
            proxyAgent
        );
        const addUserChallenge = buildAddUserChallenge(
            APPID,
            fetch,
            createAddUserChallengeRequest,
            translateAddUserChallengeResponse
        );

        return Object.freeze(
            {
                addUserChallenge
            }
        )
    }