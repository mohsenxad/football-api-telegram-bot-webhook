module.exports = function buildGetUserEventByUserAndEvent
(
    APPID,
    fetch,
    createGetUserEventByUserAndEventRequest,
    translateGetUserEventByUserAndEventResponse  
)
    {
        return async function getUserEventByUserAndEvent
        (
            userId,
            eventId
        )
            {
                const options = createGetUserEventByUserAndEventRequest(
                    userId,
                    eventId
                );
        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const userEvent = translateGetUserEventByUserAndEventResponse(
                    response
                );

                return userEvent;
            }
    }