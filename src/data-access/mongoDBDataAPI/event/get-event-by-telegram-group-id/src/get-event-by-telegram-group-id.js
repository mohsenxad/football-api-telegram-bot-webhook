module.exports = function buildGetEventByTelegramGroupId
(
    APPID,
    fetch,
    createGetEventByTelegramGroupIdRequest,
    translateGetEventByTelegramGroupIdResponse
)
    {
        return async function getEventByTelegramGroupId
        (
            telegramGroupId
        )
            {
                const options = createGetEventByTelegramGroupIdRequest(
                    telegramGroupId
                );

        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const event = translateGetEventByTelegramGroupIdResponse(
                    response
                );

                return event;
            }
    }