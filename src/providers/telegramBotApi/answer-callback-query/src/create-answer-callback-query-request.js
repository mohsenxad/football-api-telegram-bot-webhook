module.exports = function buildCreateAnswerCallbackQueryRequest
(
    proxyAgent
)
    {
        return function createAnswerCallbackQueryRequest
        (
            callback_query_id,
            text
        )
            {
                const headers = {
                    "content-type":"application/json"
                };
        
                const body = JSON.stringify(
                    {
                        callback_query_id: callback_query_id,
                        text:text,
                        show_alert: true
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