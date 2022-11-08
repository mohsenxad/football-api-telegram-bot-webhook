module.exports = function buildGetUserByTelegramId
(
    APPID,
    fetch,
    buildCreateGetUserByTelegramIdRequest,
    translateGetUserByTelegramIdResponse
)
    {
        return async function getUserByTelegramId
        (
            telegramId
        )
            {
                const options = buildCreateGetUserByTelegramIdRequest(
                    telegramId
                );

        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const user = translateGetUserByTelegramIdResponse(
                    response
                );

                return user;
            }
    }