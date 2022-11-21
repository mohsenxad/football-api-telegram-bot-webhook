module.exports = function buildCreateUpdateUserChallengeResultRequest
(
    apikey,
    proxyAgent
)
    {
        return function createUpdateUserChallengeResultRequest
        (
            userChallengeId,
            challengeOption
        )
            {
                const query = {
                    "_id": 
                        { 
                            "$oid": userChallengeId
                        } 
                };
    
                const update = {
                    challengeOption: {
                        "$oid": challengeOption,
                    }
                };
    
                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };
    
                const body = JSON.stringify(
                    {
                        collection:"userChallenges",
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