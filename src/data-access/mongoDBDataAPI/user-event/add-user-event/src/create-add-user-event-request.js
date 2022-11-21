module.exports = function buildCreateAddUserEventRequest
(
    apikey,
    proxyAgent
)
    {
        return function createAddUserEventRequest
        (
            userEvent
        )
            {
                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        collection:"userEvents",
                        database:"Football",
                        dataSource:"FootballDB",
                        document: userEvent.toBson()
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