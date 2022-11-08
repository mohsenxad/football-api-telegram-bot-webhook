const buildGetUserChallengeByUserAndChallenge = require('./src/get-user-challenge-by-user-and-challenge');
const createGetUserChallengeByUserAndChallengeRequest = require('./src/create-get-user-challenge-by-user-and-challenge-request');
const buildTranslateGetUserChallengeByUserAndChallengeResponse = require('./src/translate-get-user-challenge-by-user-and-challenge-response');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateGetUserChallengeByUserAndChallengeResponse = buildTranslateGetUserChallengeByUserAndChallengeResponse();
        const getUserChallengeByUserAndChallengeRequest = createGetUserChallengeByUserAndChallengeRequest(
            APIKEY,
            proxyAgent
        );
        const getUserChallengeByUserAndChallenge = buildGetUserChallengeByUserAndChallenge(
            APPID,
            fetch,
            getUserChallengeByUserAndChallengeRequest,
            translateGetUserChallengeByUserAndChallengeResponse
        );

        return Object.freeze(
            {
                getUserChallengeByUserAndChallenge
            }
        )
    }