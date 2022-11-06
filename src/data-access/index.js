module.exports =  function(
    {
        MONGODB_DATAAPI_APPID,
        MONGODB_DATAAPI_APIKEY
    },
    proxyUrl
)
    {
        const dataApi = require('./mongoDBDataAPI')(
            MONGODB_DATAAPI_APPID,
            MONGODB_DATAAPI_APIKEY,
            proxyUrl
        );

        return Object.freeze(
            {
                dataApi,
            }
        );
    }