const buildTranslateSendMessageResponse = require('./src/translate-send-message-response');
const buildCreateSendMessageRequest = require('./src/create-send-message-request');
const buildSendMessage = require('./src/send-message');

module.exports = function(
    BOT_TOKEN,
    proxyAgent,
    fetch
)
    {
        const translateSendMessageResponse = buildTranslateSendMessageResponse();
        const createSendMessageRequest = buildCreateSendMessageRequest(
            proxyAgent
        );
        const sendMessage = buildSendMessage(
            BOT_TOKEN,
            fetch,
            createSendMessageRequest,
            translateSendMessageResponse
        );

        return Object.freeze(
            {
                sendMessage
            }
        )
    }