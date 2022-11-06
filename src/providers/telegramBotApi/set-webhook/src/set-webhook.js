module.exports = function buildSetWebhook
(
    BOT_TOKEN,
    fetch,
    createSetWebhookRequest,
    trasnlateSetWebhookResponse
)
    {
        return async function setWebhook
        (
            webhookUrl
        )
            {
                const options = createSetWebhookRequest(
                    webhookUrl
                );

                console.log(options);

        
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
                
                console.log(url);
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                console.log(response);

                const setWebhookResult = trasnlateSetWebhookResponse(response);

                return setWebhookResult;
            }
    }