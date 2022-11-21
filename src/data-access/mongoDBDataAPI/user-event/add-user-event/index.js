const buildAddUserEvent = require('./src/add-user-event');
const buildCreateAddUserEventRequest = require('./src/create-add-user-event-request');
const buildTranslateAddUserEventResponse = require('./src/translate-add-user-event-response');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateAddUserEventResponse = buildTranslateAddUserEventResponse();
        const createAddUserEventRequest = buildCreateAddUserEventRequest(
            APIKEY,
            proxyAgent
        );
        const addUserEvent = buildAddUserEvent(
            APPID,
            fetch,
            createAddUserEventRequest,
            translateAddUserEventResponse
        );

        return Object.freeze(
            {
                addUserEvent
            }
        )
    }