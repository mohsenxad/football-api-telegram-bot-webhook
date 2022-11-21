module.exports = function buildMakeUserEvent
()
    {
        return function makeUserEvent
        (
            {
                registerDate = Date.now(),
                user,
                event
            }
        )
            {
                if (!user) {
                    throw new Error('User Event must have user.')
                }

                if (!event) {
                    throw new Error('User Event must have Event.')
                }

                return Object.freeze(
                    {
                        getRegisterDate: () => registerDate,
                        getUser: () => user,
                        getEvent: () => event,
                        toBson: toBson,
                    }
                );

                function toBson()
                    {
                        return {
                            registerDate : {
                                "$date": {
                                    "$numberLong": registerDate.toString()
                                    }
                            },
                            user: {
                                "$oid": user,
                            },
                            event: {
                                "$oid": event,
                            }
                        }
                    }
            }
    }