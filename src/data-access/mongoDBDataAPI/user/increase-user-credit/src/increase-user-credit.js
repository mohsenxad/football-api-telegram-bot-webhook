module.exports = function buildIncreaseUserCredit
(
    APPID,
    fetch,
    createIncreaseUserCreditRequest,
    translateIncreaseUserCreditResponse
)
    {
        return async function increaseUserCredit
        (
            userId,
            increaseValue
        )
            {
                const options = createIncreaseUserCreditRequest(
                    userId,
                    increaseValue
                );

        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/updateOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const updateResult = translateIncreaseUserCreditResponse(
                    response
                );

                return updateResult;
            }
    }