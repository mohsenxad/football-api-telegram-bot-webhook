module.exports = function buildCreateGetUserByTelegramIdRequest
(
    apikey,
    proxyAgent
)
    {
        return function createGetUserByTelegramIdRequest
        (
            telegramId
        )
            {
                const query = {
                    "telegramId": telegramId
                };

                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        collection:"users",
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