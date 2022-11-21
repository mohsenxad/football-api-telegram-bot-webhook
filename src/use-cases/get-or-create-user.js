module.exports = function buildGetOrCreateUser
(
    dataAccess
)
    {
        return async function getOrCreateUser
        (
            userInfo
        )
            {
                const foundUser = await dataAccess.dataApi.getUserByTelegramId(
                    userInfo.id
                );

                if
                (
                    !foundUser
                )
                    {
                        //create User Model
                        // add user to databasse
                        // return new user
                    }

                return foundUser;
                
                
            }
    }