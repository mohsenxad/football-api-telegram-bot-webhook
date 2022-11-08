const buildTranslateAddUserResponse = require('./src/translate-add-user-response');
const buildCreateAddUserRequest = require('./src/create-add-user-request');
const buildAddUser = require('./src/add-user');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateAddUserResponse = buildTranslateAddUserResponse();
        const createAddUserRequest = buildCreateAddUserRequest(
            APIKEY,
            proxyAgent
        );
        const addUser = buildAddUser(
            APPID,
            fetch,
            createAddUserRequest,
            translateAddUserResponse
        );

        return Object.freeze(
            {
                addUser
            }
        )
    }