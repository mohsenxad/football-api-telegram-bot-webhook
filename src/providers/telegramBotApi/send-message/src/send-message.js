module.exports = function buildSendMessage
(
    BOT_TOKEN,
    fetch,
    createSendMessageRequest,
    translateSendMessageResponse
)
    {
        return async function sendMessage
        (
            chat_id,
            text,
            reply_markup
        )
            {
                const options = createSendMessageRequest(
                    chat_id,
                    text,
                    reply_markup
                );

                console.log(options);

        
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
                
                console.log(url);
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                console.log(response);

                const sendMessageResponse = translateSendMessageResponse(response);

                return sendMessageResponse;
            }
    }