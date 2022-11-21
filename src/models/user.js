module.exports = function buildMakeUser
()
    {
        return function makeUser
        (
            {
                registerDate = Date.now(),
                id,
                username,
                first_name,
                last_name,
                language_code,
                credit = 0
            }
        )
            {
                if (!id) {
                    throw new Error('User must have id.')
                }

                return Object.freeze(
                    {
                        getRegisterDate: () => registerDate,
                        getTelegramId: () => id,
                        getTelegramUsername: () => username,
                        getTelegramFirstname: () => first_name,
                        getTelegramLastname: () => last_name,
                        getTelegramLanguageCode: () => language_code,
                        getCredit: ()=> credit,
                        toBson: toBson,
                    }
                );

                function toBson(){
                    return {
                        registerDate : {
                            "$date": {
                                "$numberLong": registerDate.toString()
                                }
                        },
                        telegramId: id,
                        telegramUsername: username,
                        telegramFirstname: first_name,
                        telegramLastname: last_name,
                        telegramLanguageCode: language_code,
                        credit:credit
                    }
                }

            }
    }