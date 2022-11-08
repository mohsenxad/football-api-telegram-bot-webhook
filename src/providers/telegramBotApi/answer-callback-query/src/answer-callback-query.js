module.exports = function buildAnswerCallbackQuery
(
    BOT_TOKEN,
    fetch,
    createAnswerCallbackQueryRequest,
    translateAnswerCallbackQueryResponse
)
    {
        return async function answerCallbackQuery
        (
            callback_query_id,
            text
        )
            {
                const options = createAnswerCallbackQueryRequest(
                    callback_query_id,
                    text
                );

                const url = `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const answeCallbackQueryResult = translateAnswerCallbackQueryResponse(
                    response
                );

                return answeCallbackQueryResult;
            }
    }