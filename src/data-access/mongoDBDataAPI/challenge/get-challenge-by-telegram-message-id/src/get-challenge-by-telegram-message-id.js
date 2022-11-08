module.exports = function buildGetChallengeByTelegramMessageId
(
    APPID,
    fetch,
    createGetChallengeByTelegramMessageIdRequest,
    translateGetChallengeByTelegramMessageIdResponse
)
    {
        return async function getChallengeByTelegramMessageId
        (
            channelMessageId
        )
            {
                const options = createGetChallengeByTelegramMessageIdRequest(
                    channelMessageId
                );

                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const challenge = translateGetChallengeByTelegramMessageIdResponse(
                    response
                );

                return challenge;
            }
    }