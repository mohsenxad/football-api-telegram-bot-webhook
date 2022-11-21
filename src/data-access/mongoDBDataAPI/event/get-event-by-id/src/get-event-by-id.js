module.exports = function builGetEventById
(
    APPID,
    fetch,
    createGetEventByIdRequest,
    translateGetEventByIdResponse
)
    {
        return async function getEventById
        (
            eventId
        )
            {
                const options = createGetEventByIdRequest(
                    eventId
                );

        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const event = translateGetEventByIdResponse(
                    response
                );

                return event;
            }
    }