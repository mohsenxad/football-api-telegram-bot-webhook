module.exports = function buildGetChatMember
(
    BOT_TOKEN,
    fetch,
    createGetChatMemberRequest,
    translateGetChatMemberResponse
)
    {
        return async function getChatMember
        (
            chat_id,
            user_id
        )
            {
                const options = createGetChatMemberRequest(
                    chat_id,
                    user_id
                );

                console.log(options);

        
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember`;
                
                console.log(url);
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                console.log(response);

                const sendMessageResponse = translateGetChatMemberResponse(response);

                return sendMessageResponse;
            }
    }