module.exports = function buildTranslateAnswerCallbackQueryResponse
()
    {
        return function translateAnswerCallbackQueryResponse
        (
            response
        )
            {
                console.log(response);
                if(
                    response.ok == true
                )
                    {
                        return response.ok;    
                    }
                else
                    {
                        const responseError = new Error(response.description)
                        throw responseError;
                    }
            }
    }