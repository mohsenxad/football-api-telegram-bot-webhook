module.exports = function buildTranslateAddUserChallengeResponse
()
    {
        return function translateAddUserChallengeResponse
        (
            response
        )
            {
                return response.insertedId;
            }
    }