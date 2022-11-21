module.exports = function buildCreateGetUserEventByUserAndEventRequest
(
    apikey,
    proxyAgent
)
    {
        return function createGetUserEventByUserAndEventRequest
        (
            userId,
            eventId
        )
            {
                const query = {
                    "user": 
                        { 
                            "$oid": userId
                        },
                    "event": 
                    { 
                        "$oid": eventId
                    }
                };

                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };

                const projection = {}

                const body = JSON.stringify(
                    {
                        collection:"userEvents",
                        database:"Football",
                        dataSource:"FootballDB",
                        filter: query,
                        projection:projection
                    }
                );
        
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