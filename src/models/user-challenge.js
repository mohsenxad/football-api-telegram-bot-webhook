module.exports = function buildMakeUserChallenge
()
    {
        return function makeUserChallenge
        (
            {
                registerDate = Date.now(),
                user,
                challenge,
                challengeOption
            }
        )
            {
                if (!user) {
                    throw new Error('User Challenge must have user.')
                }

                if (!challenge) {
                    throw new Error('User Challenge must have challenge.')
                }

                if (!challengeOption) {
                    throw new Error('User Challenge must have challengeOption.')
                }

                return Object.freeze(
                    {
                        getRegisterDate: () => registerDate,
                        getUser: () => user,
                        getChallenge: () => challenge,
                        getChallengeOption: () => challengeOption,
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
                            challenge: {
                                "$oid": challenge,
                            },
                            challengeOption: {
                                "$oid": challengeOption,
                            }
                        }
                    }
            }
    }