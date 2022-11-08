const models = require('../models');

module.exports = function buildProccessMessage
(
    dataAccess,
    providerServices
)
    {
        return async function proccessMessage
        (
            message
        )
            {

                try 
                    {
                        if(
                            message.update_id &&
                            message.callback_query
                        )
                            {
                                if(
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
                                        console.log(`foundChallenge: ${foundChallenge.title}`);
        
                                        if
                                        (
                                            foundChallenge
                                        )
                                            {
                                                const challengeOptionId = message.callback_query.data;
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
        
                                                console.log(`foundOption: ${foundOption.title}`);
                                                if
                                                (
                                                    foundOption
                                                )
                                                    {
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
        
                                                                console.log(`New Usesr and newUserChallengeId: ${newUserChallengeId}`);
                                                                providerServices.telegramBot.answerCallbackQuery(
                                                                    callbackQueryId,
                                                                    "پیش بینی شما ثبت شد.\nببینیم و تعریف کنیم🤨 "
                                                                ) 
                                                                return true;
                                                            }
                                                        else
                                                            {
                                                                const foundUserChallenge = await dataAccess.dataApi.getUserChallengeByUserAndChallenge(
                                                                    foundUser._id,
                                                                    foundChallenge._id
                                                                );
        
                                                                
        
                                                                if
                                                                (
                                                                    foundUserChallenge
                                                                )
                                                                    {
                                                                        console.log(`Existing Usesr and  foundUserChallenge : ${foundUserChallenge._id}`);
                                                                        const foundSelectedOption = foundChallenge.optionList.find(
                                                                            option => 
                                                                                {
                                                                                    if
                                                                                    (
                                                                                        option._id == foundUserChallenge.challengeOption
                                                                                    )
                                                                                        {
                                                                                            return option;
                                                                                        }
                                                                                }
                                                                        );
                                                                        throw new Error(`😏 شما قبلا شانستون رو امتحان کردین با نتیجه ی ${foundSelectedOption.title}`);
                                                                    }
                                                                else
                                                                    {
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
        
                                                                        console.log(`Existing User and newUserChallengeId: ${newUserChallengeId}`);
                                                                        providerServices.telegramBot.answerCallbackQuery(
                                                                            callbackQueryId,
                                                                            "پیش بینی شما ثبت شد.\nببینیم و تعریف کنیم🤨 "
                                                                        ) 
                                                                        return true;
                                                                    }
                                                            }
                                                    }
                                                else
                                                    {
                                                        throw new Error("No ChallengeOption Found With Data")
                                                    }
        
                                            }
                                        else
                                            {
                                                throw new Error("No Challenge Found With Chhannel Mesage Id")
                                            }
                                    }
                            }
                        
                    }
                catch (error) 
                    {
                        console.log(error);
                        const callbackQueryIdForError = message.callback_query.id;
                        providerServices.telegramBot.answerCallbackQuery(
                            callbackQueryIdForError,
                            error.message
                        )  
                    }

            }
    }