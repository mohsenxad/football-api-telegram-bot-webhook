module.exports = function buildIsUserInTelegramGroup
(
    providerServices
)
    {
        return async function isUserInTelegramGroup
        (
            telegramUserId,
            telegramGroupId
        )
            {
                const getChatMemeberResult = await providerServices.telegramBot.getChatMember(
                    telegramGroupId,
                    telegramUserId
                )

                if
                (
                    getChatMemeberResult.status == "member"
                )
                    {
                        return true;
                    }
                else
                    {
                        return false;
                    }

            }
    }