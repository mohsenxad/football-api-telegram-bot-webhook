module.exports = function buildCreateSendMessageRequest
(
    proxyAgent
)
    {
        return function createSendMessageRequest
        (
            chat_id,
            text,
            reply_markup
        )
            {
                const headers = {
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        chat_id: chat_id,
                        text: text,
                        //reply_markup: reply_markup
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