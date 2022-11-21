module.exports = function buildTranslateGetChatMemberResponse
()
    {
        return function translateGetChatMemberResponse
        (
            response
        )
            {
                if(
                    response.ok == true &&
                    response.result
                ){
                    return response.result;    
                }
            }
    }