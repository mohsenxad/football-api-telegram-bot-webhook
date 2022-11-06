const buildTrasnlateSetWebhookResponse = require('./src/trasnlate-set-webhook-response');
const buildCreateSetWebhookRequest = require('./src/create-set-webhook-request');
const buildSetWebhook = require('./src/set-webhook');

module.exports = function(
    BOT_TOKEN,
    proxyAgent,
    fetch
)
    {
        const trasnlateSetWebhookResponse = buildTrasnlateSetWebhookResponse();
        const createSetWebhookRequest = buildCreateSetWebhookRequest(
            proxyAgent
        );
        const setWebhook = buildSetWebhook(
            BOT_TOKEN,
            fetch,
            createSetWebhookRequest,
            trasnlateSetWebhookResponse
        );

        return Object.freeze(
            {
                setWebhook
            }
        )
    }