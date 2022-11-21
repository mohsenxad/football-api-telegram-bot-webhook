module.exports = function buildGetUserChallengeByUserAndChallenge
(
    APPID,
    fetch,
    createGetUserChallengeByUserAndChallengeRequest,
    translateGetUserChallengeByUserAndChallengeResponse  
)
    {
        return async function getUserChallengeByUserAndChallenge
        (
            userId,
            challengeId
        )
            {
                const options = createGetUserChallengeByUserAndChallengeRequest(
                    userId,
                    challengeId
                );
        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const userChallenge = translateGetUserChallengeByUserAndChallengeResponse(
                    response
                );

                return userChallenge;
            }
    }