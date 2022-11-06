module.exports = function buildCreateSetWebhookRequest
(
    proxyAgent
)
    {
        return function createSetWebhookRequest
        (
            url
        )
            {
                const headers = {
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        url: url
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