const models = require('../models');
module.exports = function buildProcessCallbackQuery
(
    dataAccess,
    providerServices,
    isUserInTelegramGroup
)
    {
        return async function processCallbackQuery
        (
            message
        )
            {
                if
                (
                    message.update_id &&
                    message.callback_query
                )
                    {
                        if
                        (
                            message.callback_query.from &&
                            message.callback_query.from.id &&
                            message.callback_query.message &&
                            message.callback_query.message.message_id &&
                            message.callback_query.data
                        )
                            {
                                const callbackQueryId = message.callback_query.id;
                                const channelMessageId = message.callback_query.message.message_id;

                                const foundChallenge = await dataAccess.dataApi.getChallengeByTelegramMessageId(
                                    channelMessageId
                                );

                                if
                                (
                                    foundChallenge
                                )
                                    {
                                        console.log(`foundChallenge: ${foundChallenge.title}`);
                                        const challengeOptionId = message.callback_query.data;

                                        const foundEvent = await dataAccess.dataApi.getEventById(
                                            foundChallenge.event
                                        )

                                        const foundOption = foundChallenge.optionList.find(
                                            option => 
                                                {
                                                    if
                                                    (
                                                        option._id == challengeOptionId
                                                    )
                                                        {
                                                            return option;
                                                        }
                                                }
                                        );

                                        if
                                        (
                                            foundOption
                                        )
                                            {
                                                console.log(`foundOption: ${foundOption.title}`);

                                                const userInfo = models.makeUser(
                                                    message.callback_query.from
                                                );

                                                const foundUser = await dataAccess.dataApi.getUserByTelegramId(
                                                    userInfo.getTelegramId()
                                                )

                                                if
                                                (
                                                    !foundUser
                                                )
                                                    {
                                                        const newUserId = await dataAccess.dataApi.addUser(
                                                            userInfo
                                                        );

                                                        const foundUserInTelegramGroup = await isUserInTelegramGroup(
                                                            userInfo.getTelegramId(),
                                                            foundEvent.telegramGroupId
                                                        )
                                                        
                                                        if
                                                        (
                                                            !foundUserInTelegramGroup
                                                        )
                                                            {
                                                                const joinToGroupMessage = `👍میخواید تو چالش ها شرکت کنید؟\n🤨 ولی هنوز عضو گروه نشدین\n🤩 اول عضو گروه بشید و امتیاز عضویت تو گروه رو بگیرید\n🎉 بعد از عضو شدن، دوباره نتیجه را حدث بزنید`;
                                                                await providerServices.telegramBot.answerCallbackQuery(
                                                                    callbackQueryId,
                                                                    joinToGroupMessage
                                                                )
                                                                return;
                                                            }
                                                        

                                                        console.log(`newUserId: ${newUserId}`);
                                                        const userChallengeInfo = models.makeUserChallenge(
                                                            {
                                                                user : newUserId,
                                                                challenge: foundChallenge._id,
                                                                challengeOption: foundOption._id
                                                            }
                                                        );

                                                        const newUserChallengeId = await dataAccess.dataApi.addUserChallenge(
                                                            userChallengeInfo
                                                        );
                                                        

                                                        // send Message On Group
                                                        let userTitle = `یک نفر `;
                                                        if
                                                        (
                                                            userInfo.getTelegramUsername()
                                                        )
                                                            {
                                                                userTitle = `@${userInfo.getTelegramUsername()}`;
                                                            }
                                                        else if
                                                        (
                                                            userInfo.getTelegramFirstname() &&
                                                            userInfo.getTelegramLastname() 
                                                        )
                                                            {
                                                                userTitle = `${userInfo.getTelegramFirstname()} ${userInfo.getTelegramLastname()}`;
                                                            }
                                                        else if
                                                        (
                                                            userInfo.getTelegramFirstname() &&
                                                            !userInfo.getTelegramLastname() 
                                                        )
                                                            {
                                                                userTitle = `${userInfo.getTelegramFirstname()}`;
                                                            }
                                                        else if
                                                        (
                                                            !userInfo.getTelegramFirstname() &&
                                                            userInfo.getTelegramLastname() 
                                                        )
                                                            {
                                                                userTitle = `${userInfo.getTelegramLastname()}`;
                                                            }
                                                        
                                                        const reportUserResultOnGroupMessage = `🧐 ${userTitle} نتیجه رو ${foundOption.title} پیش بینی کرد`
                                                        const reportUserResultOnGroupResult = await providerServices.telegramBot.sendMessage(
                                                            foundEvent.telegramGroupId,
                                                            reportUserResultOnGroupMessage,
                                                            {}
                                                        );

                                                        console.log(`New Usesr and newUserChallengeId: ${newUserChallengeId}`);
                                                        const setChallengeResultMessage = `پیش بینی شما ثبت شد.\nببینیم و تعریف کنیم🤨\n💢 ${foundChallenge.cost} امتیاز ازتون کم شد و در انتها، اگر درست حدث زده باشید ${foundChallenge.revenue} امتیاز به دست میارید.`;
                                                        providerServices.telegramBot.answerCallbackQuery(
                                                            callbackQueryId,
                                                            setChallengeResultMessage
                                                        ) 
                                                        return true;
                                                        
                                                    }
                                                else // found user flow
                                                    {
                                                        if
                                                        (
                                                            foundUser.credit < foundChallenge.cost
                                                        )
                                                            {
                                                                const notEnughCreditMessage = `🧐 امتیاز شما ${foundUser.credit} هست.\n💎برای شرکت در این چالش باید ${foundChallenge.cost} امتیاز داشته باشید.\n👌با اضافه کردن دوستانتون به گروه، میتونید امتیاز بیشتر بگیرید\n🎉بعد دوباره در چالش شرکت کنید`
                                                                providerServices.telegramBot.answerCallbackQuery(
                                                                    callbackQueryId,
                                                                    notEnughCreditMessage
                                                                );
                                                                return;
                                                            
                                                            }
                                                        
                                                        const foundUserChallenge = await dataAccess.dataApi.getUserChallengeByUserAndChallenge(
                                                            foundUser._id,
                                                            foundChallenge._id
                                                        );

                                                        if
                                                        (
                                                            foundUserChallenge
                                                        )
                                                            {

                                                                if
                                                                (
                                                                    foundUserChallenge.challengeOption == foundOption._id
                                                                )
                                                                    {
                                                                        const noChangeUserChallengeMessage = `🥸 قبلا ${foundOption.title} رو پیش بینی کرده بودی!`
                                                                        await providerServices.telegramBot.answerCallbackQuery(
                                                                            callbackQueryId,
                                                                            noChangeUserChallengeMessage
                                                                        ) 
                                                                        return true;
                                                                    }
                                                                else
                                                                    {
                                                                        // user have set the challenge befor so need to update result
                                                                        const updateUserChallengeResult = await dataAccess.dataApi.updateUserChallengeResult(
                                                                            foundUserChallenge._id,
                                                                            foundOption._id
                                                                        );

                                                                        const decreaseCreditResult = await dataAccess.dataApi.decreaseUserCredit(
                                                                            foundUser._id,
                                                                            foundChallenge.cost
                                                                        );
                                                                        const changeUserChallengeMessage = `😜 نظرت عوض شد؟\n👍 نتیجه ی ${foundOption.title} ثبت شد.\n😏 ${foundChallenge.cost} امتیاز دیگه از دست دادی`
                                                                        await providerServices.telegramBot.answerCallbackQuery(
                                                                            callbackQueryId,
                                                                            changeUserChallengeMessage
                                                                        ) 
                                                                        return true;
                                                                    }
                            
                                                            }
                                                        else // user has not set result before for this challenge
                                                            {
                                                                const foundUserInTelegramGroup = await isUserInTelegramGroup(
                                                                    foundUser.telegramId,
                                                                    foundEvent.telegramGroupId
                                                                )

                                                                if
                                                                (
                                                                    !foundUserInTelegramGroup
                                                                )
                                                                    {
                                                                        const joinToGroupMessage = `👍میخواید تو چالش ها شرکت کنید؟\n🤨 ولی هنوز عضو گروه نشدین\n🤩 اول عضو گروه بشید و امتیاز عضویت تو گروه رو بگیرید\n🎉 بعد از عضو شدن، دوباره نتیجه را حدث بزنید`;
                                                                        await providerServices.telegramBot.answerCallbackQuery(
                                                                            callbackQueryId,
                                                                            joinToGroupMessage
                                                                        )
                                                                        return;
                                                                    }
                                                                
                                                                let userTitle = `یک نفر `;
                                                                if
                                                                (
                                                                    foundUser.telegramUsername
                                                                )
                                                                    {
                                                                        userTitle = `@${foundUser.telegramUsername}`;
                                                                    }
                                                                else if
                                                                (
                                                                    foundUser.telegramFirstname &&
                                                                    foundUser.telegramLastname 
                                                                )
                                                                    {
                                                                        userTitle = `${foundUser.telegramFirstname} ${foundUser.telegramLastname}`;
                                                                    }
                                                                else if
                                                                (
                                                                    foundUser.telegramFirstname &&
                                                                    !foundUser.telegramLastname 
                                                                )
                                                                    {
                                                                        userTitle = `${foundUser.telegramFirstname}`;
                                                                    }
                                                                else if
                                                                (
                                                                    !foundUser.telegramFirstname &&
                                                                    foundUser.telegramLastname 
                                                                )
                                                                    {
                                                                        userTitle = `${foundUser.telegramLastname}`;
                                                                    }
                                                                
                                                                const reportUserResultOnGroupMessage = `🧐 ${userTitle} نتیجه رو ${foundOption.title} پیش بینی کرد`
                                                                const reportUserResultOnGroupResult = await providerServices.telegramBot.sendMessage(
                                                                    foundEvent.telegramGroupId,
                                                                    reportUserResultOnGroupMessage,
                                                                    {}
                                                                );

                                                                const userChallengeInfo = models.makeUserChallenge(
                                                                    {
                                                                        user : foundUser._id,
                                                                        challenge: foundChallenge._id,
                                                                        challengeOption: foundOption._id
                                                                    }
                                                                );

                                                                const newUserChallengeId = await dataAccess.dataApi.addUserChallenge(
                                                                    userChallengeInfo
                                                                );

                                                                const decreaseCreditResult = await dataAccess.dataApi.decreaseUserCredit(
                                                                    foundUser._id,
                                                                    foundChallenge.cost
                                                                );

                                                                console.log(`Existing User and newUserChallengeId: ${newUserChallengeId}`);
                                                                const setChallengeResultMessage = `پیش بینی شما ثبت شد.\nببینیم و تعریف کنیم🤨\n💢 ${foundChallenge.cost} امتیاز ازتون کم شد و در انتها، اگر درست حدث زده باشید ${foundChallenge.revenue} امتیاز به دست میارید.`;
                                                                await providerServices.telegramBot.answerCallbackQuery(
                                                                    callbackQueryId,
                                                                    setChallengeResultMessage
                                                                ) 
                                                                return true;

                                                            }
                                                    }

                                            }
                                        else
                                            {
                                                console.log(`Selected ChallengeOption Id not found in challenge options`);
                                            }
                                    }
                                else
                                    {
                                        console.log(`this is not from a challenge group`);
                                    }

                            }
                    }
            }
    }