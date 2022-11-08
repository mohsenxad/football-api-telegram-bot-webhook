module.exports = function buildTranslateAddUserChallengeResponse
()
    {
        return function translateAddUserChallengeResponse
        (
            response
        )
            {
                console.log(response);
                return response.insertedId;
            }
    }