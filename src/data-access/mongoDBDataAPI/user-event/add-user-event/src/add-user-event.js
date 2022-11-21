module.exports = function buildAddUserEvent
(
    APPID,
    fetch,
    createAddUserEventRequest,
    translateAddUserEventResponse
)
    {
        return async function addUserEvent
        (
            userEvent
        )
            {
                const options = createAddUserEventRequest(
                    userEvent
                );

                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/insertOne`;

                const request = await fetch(
                    url,
                    options
                );

                const response = await request.json();

                const userEventId = translateAddUserEventResponse(response);
                
                return userEventId;
            }
    }