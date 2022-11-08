module.exports = function buildCreateAddUserRequest
(
    apikey,
    proxyAgent
)
    {
        return function  createAddUserRequest
        (
            user
        )
            {
                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };

        
                const body = JSON.stringify(
                    {
                        collection:"users",
                        database:"Football",
                        dataSource:"FootballDB",
                        document: user.toBson()
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