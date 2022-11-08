const buildTranslateAnswerCallbackQueryResponse = require('./src/translate-answer-callback-query-response');
const buildCreateAnswerCallbackQueryRequest = require('./src/create-answer-callback-query-request');
const buildAnswerCallbackQuery = require('./src/answer-callback-query');

module.exports = function(
    BOT_TOKEN,
    proxyAgent,
    fetch
)
    {
        const translateAnswerCallbackQueryResponse = buildTranslateAnswerCallbackQueryResponse();
        const createAnswerCallbackQueryRequest = buildCreateAnswerCallbackQueryRequest(
            proxyAgent
        );
        const answerCallbackQuery = buildAnswerCallbackQuery(
            BOT_TOKEN,
            fetch,
            createAnswerCallbackQueryRequest,
            translateAnswerCallbackQueryResponse
        );

        return Object.freeze(
            {
                answerCallbackQuery
            }
        )
    }