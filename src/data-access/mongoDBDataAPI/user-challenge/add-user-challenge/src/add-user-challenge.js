module.exports = function buildAddUserChallenge
(
    APPID,
    fetch,
    createAddUserChallengeRequest,
    translateAddUserChallengeResponse
)
    {
        return async function addUserChallenge
        (
            userChallenge
        )
            {
                const options = createAddUserChallengeRequest(
                    userChallenge
                );

                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/insertOne`;

                const request = await fetch(
                    url,
                    options
                );

                const response = await request.json();

                const userChallengeId = translateAddUserChallengeResponse(response);
                
                return userChallengeId;
            }
    }