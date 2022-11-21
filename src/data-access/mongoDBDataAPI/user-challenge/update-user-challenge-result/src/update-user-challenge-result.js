module.exports = function buildUpdateUserChallengeResult
(
    APPID,
    fetch,
    createUpdateUserChallengeResultRequest,
    translateUpdateUserChallengeResultResponse
)
    {
        return async function updateUserChallengeResult
        (
            userChallengeId,
            challengeOption
        )
            {
                const options = createUpdateUserChallengeResultRequest(
                    userChallengeId,
                    challengeOption
                );

                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/updateOne`;

                const request = await fetch(
                    url,
                    options
                );

                const response = await request.json();

                const updateResult = translateUpdateUserChallengeResultResponse(response);
                
                return updateResult;
            }
    }