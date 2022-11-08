module.exports = function buildCreateGetChallengeByTelegramMessageIdRequest
(
    apikey,
    proxyAgent
)
    {
        return function createGetChallengeByTelegramMessageIdRequest
        (
            channelMessageId
        )
            {
                const query = {
                    "channelMessageId": channelMessageId
                };

                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        collection:"challenges",
                        database:"Football",
                        dataSource:"FootballDB",
                        filter: query
                    }
                )
        
                var options= {
                    method:"POST",
                    headers: headers,
                    body: body
                };
        
        
                if(proxyAgent){
                    options.agent = proxyAgent;
                }
        
                return options;
            }
    }