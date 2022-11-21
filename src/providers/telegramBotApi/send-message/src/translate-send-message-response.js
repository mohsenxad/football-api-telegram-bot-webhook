module.exports = function buildTranslateSendMessageResponse
()
    {
        return function translateSendMessageResponse
        (
            response
        )
            {
                console.log(response);
                if(
                    response.ok == true &&
                    response.result
                ){
                    return response.result.message_id;    
                }
            }
    }