var fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

module.exports  = function
(
    APPID,
    APIKEY,
    proxyUrl
)
    {

        if(!APPID){
            throw new Error("MongoDB Data Api must have an APPID");
        }

        if(!APIKEY){
            throw new Error("MongoDB Data Api must have an APIKEY");
        }

        let proxyAgent = undefined;
        if(proxyUrl){
            proxyAgent = new HttpsProxyAgent(proxyUrl);
        }


        const { addUser } = require('./user/add-user')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )
        
        const { getUserByTelegramId } = require('./user/get-user-by-telegram-id')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        );

        const { getChallengeByTelegramMessageId } = require('./challenge/get-challenge-by-telegram-message-id')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        
        

        
        const { getUserChallengeByUserAndChallenge } = require('./user-challenge/get-user-challenge-by-user-and-challenge')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        const { addUserChallenge } = require('./user-challenge/add-user-challenge')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        const { getEventById } = require('./event/get-event-by-id')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        const { getEventByTelegramGroupId } = require('./event/get-event-by-telegram-group-id')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        

        
        const { addUserEvent } = require('./user-event/add-user-event')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        
        const { getUserEventByUserAndEvent } = require('./user-event/get-user-event-by-user-and-event')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        
        const { increaseUserCredit } = require('./user/increase-user-credit')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        const { decreaseUserCredit } = require('./user/decrease-user-credit')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )

        const { updateUserChallengeResult } = require('./user-challenge/update-user-challenge-result')
        (
            APPID,
            APIKEY,
            proxyAgent,
            fetch
        )
        

        return Object.freeze(
            {
                addUser,
                getUserByTelegramId,
                getChallengeByTelegramMessageId,
                getUserChallengeByUserAndChallenge,
                addUserChallenge,
                getEventById,
                addUserEvent,
                getUserEventByUserAndEvent,
                getEventByTelegramGroupId,
                increaseUserCredit,
                decreaseUserCredit,
                updateUserChallengeResult
            }
        );

    }