module.exports = function buildSetWebhook
(
    providerServices
)
    {
        return async function setWebhook
        (
            webhookUrl
        )
            {
                const setWebhookUrlResponse = await providerServices.telegramBot.setWebhook(
                    webhookUrl
                );
                console.log(setWebhookUrlResponse);
                return setWebhookUrlResponse;
            }
    }