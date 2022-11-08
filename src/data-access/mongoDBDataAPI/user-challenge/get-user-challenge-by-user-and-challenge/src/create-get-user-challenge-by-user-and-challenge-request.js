module.exports = function createGetUserChallengeByUserAndChallengeRequest
(
    apikey,
    proxyAgent
)
    {
        return function getUserChallengeByUserAndChallengeRequest
        (
            userId,
            challengeId
        )
            {
                const query = {
                    "user": 
                        { 
                            "$oid": userId
                        },
                    "challenge": 
                    { 
                        "$oid": challengeId
                    }
                };

                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };

                const projection = {}

                const body = JSON.stringify(
                    {
                        collection:"userChallenges",
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