const buildTranslateGetEventByIdResponse = require('./src/translate-get-event-by-id-response');
const buildCreateGetEventByIdRequest = require('./src/create-get-event-by-id-request');
const builGetEventById = require('./src/get-event-by-id');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateGetEventByIdResponse = buildTranslateGetEventByIdResponse();
        const createGetEventByIdRequest = buildCreateGetEventByIdRequest(
            APIKEY,
            proxyAgent
        );
        const getEventById = builGetEventById(
            APPID,
            fetch,
            createGetEventByIdRequest,
            translateGetEventByIdResponse
        );

        return Object.freeze(
            {
                getEventById
            }
        )
    }