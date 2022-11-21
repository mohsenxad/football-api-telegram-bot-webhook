module.exports = function buildCreateDecreaseUserCreditRequest
(
    apikey,
    proxyAgent
)
    {
        return function createDecreaseUserCreditRequest
        (
            userId,
            decreaseValue
        )
            {
                const query = {
                    "_id": 
                        { 
                            "$oid": userId
                        } 
                };
    
                const update = {
                    "$inc": {
                        credit: decreaseValue * -1
                    }
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
                        filter: query,
                        update: update
                    }
                );
    
                var options = {
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