const buildTranslateGetChatMemberResponse = require('./src/translate-get-chat-member-response');
const buildCreateGetChatMemberRequest = require('./src/create-get-chat-member-request');
const buildGetChatMember = require('./src/get-chat-member');

module.exports = function(
    BOT_TOKEN,
    proxyAgent,
    fetch
)
    {
        const translateGetChatMemberResponse = buildTranslateGetChatMemberResponse();
        const ccreateGetChatMemberRequest = buildCreateGetChatMemberRequest(
            proxyAgent
        );
        const getChatMember = buildGetChatMember(
            BOT_TOKEN,
            fetch,
            ccreateGetChatMemberRequest,
            translateGetChatMemberResponse
        );

        return Object.freeze(
            {
                getChatMember
            }
        )
    }