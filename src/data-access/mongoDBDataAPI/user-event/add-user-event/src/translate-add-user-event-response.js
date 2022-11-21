module.exports = function buildTranslateAddUserEventResponse
()
    {
        return function translateAddUserEventResponse
        (
            response
        )
            {
                return response.insertedId;
            }
    }