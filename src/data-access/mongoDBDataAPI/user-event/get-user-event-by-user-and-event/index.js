const buildGetUserEventByUserAndEvent = require('./src/get-user-event-by-user-and-event');
const buildCreateGetUserEventByUserAndEventRequest = require('./src/create-get-user-event-by-user-and-event-request');
const buildTranslateGetUserEventByUserAndEventResponse = require('./src/translate-get-user-event-by-user-and-event-response');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateGetUserEventByUserAndEventResponse = buildTranslateGetUserEventByUserAndEventResponse();
        const createGetUserEventByUserAndEventRequest = buildCreateGetUserEventByUserAndEventRequest(
            APIKEY,
            proxyAgent
        );
        const getUserEventByUserAndEvent = buildGetUserEventByUserAndEvent(
            APPID,
            fetch,
            createGetUserEventByUserAndEventRequest,
            translateGetUserEventByUserAndEventResponse
        );

        return Object.freeze(
            {
                getUserEventByUserAndEvent
            }
        )
    }