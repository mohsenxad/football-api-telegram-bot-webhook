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
        

        return Object.freeze(
            {
                addUser,
                getUserByTelegramId,
                getChallengeByTelegramMessageId,
                getUserChallengeByUserAndChallenge,
                addUserChallenge
            }
        );

    }