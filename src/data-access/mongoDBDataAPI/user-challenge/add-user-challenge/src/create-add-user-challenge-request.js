module.exports = function buildCreateAddUserChallengeRequest
(
    apikey,
    proxyAgent
)
    {
        return function createAddUserChallengeRequest
        (
            userChallenge
        )
            {
                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        collection:"userChallenges",
                        database:"Football",
                        dataSource:"FootballDB",
                        document: userChallenge.toBson()
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