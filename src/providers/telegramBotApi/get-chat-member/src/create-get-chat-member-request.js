module.exports = function buildCreateGetChatMemberRequest
(
    proxyAgent
)
    {
        return function createGetChatMemberRequest
        (
            chat_id,
            user_id
        )
            {
                const headers = {
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        chat_id: chat_id,
                        user_id: user_id
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