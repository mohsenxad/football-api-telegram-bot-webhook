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

                const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const setWebhookResult = trasnlateSetWebhookResponse(response);

                return setWebhookResult;
            }
    }