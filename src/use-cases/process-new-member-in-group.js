const models = require("../models");

module.exports = function buildProcessNewMemberInGroup
(
    dataAccess,
    providerServices
)
    {
        return async function processNewMemberInGroup
        (
            message
        )
            {

                const inviterIsBot = message.from.is_bot;
                if
                (
                    inviterIsBot == true
                )
                    {
                        // notify admin about this event and the bot
                        // may be remove bot from chat
                        return;
                    }
                
                const telegramGroupId = message.chat.id;
                const foundEvent = await dataAccess.dataApi.getEventByTelegramGroupId(
                    telegramGroupId
                );

                if
                (
                    !foundEvent
                )
                    {
                        // notify acctivity on group the is not in event list
                        // throw error
                        return;
                    }

                var inviterId;
                const inviterTelegramId = message.from.id;
                let inviter = await dataAccess.dataApi.getUserByTelegramId(
                    inviterTelegramId
                );

                if
                (
                    !inviter
                )
                    {
                        // add inviter
                        const newInviter = models.makeUser(
                            message.from
                        )
                        const inviterInsertedId = await dataAccess.dataApi.addUser(
                            newInviter
                        )

                        inviterId = inviterInsertedId;
                    }
                else
                    {
                        inviterId = inviter._id;
                    }
                
                const foundInviterUserEvent = await dataAccess.dataApi.getUserEventByUserAndEvent(
                    inviterId,
                    foundEvent._id
                )

                if
                (
                    !foundInviterUserEvent
                )
                    {
                        const newUserEvent = models.makeUserEvent(
                            {
                                user: inviterId,
                                event: foundEvent._id
                            }
                        )
                        const inviterUserEventId = await dataAccess.dataApi.addUserEvent(
                            newUserEvent
                        )
                        
                        const updateNewInviterCreditResult = await dataAccess.dataApi.increaseUserCredit(
                            inviterId,
                            10
                        );
                        console.log('updateNewInviterCreditResult');
                        console.log(updateNewInviterCreditResult);
                        
                    }

                if(
                    message.new_chat_members &&
                    message.new_chat_members.length > 0
                )
                    {
                        let newInviteeUserIdList = [];
                        for (let index = 0; index < message.new_chat_members.length; index++) 
                        // {
                        //     const element = array[index];
                            
                        // }
                        // await message.new_chat_members.forEach(async inviteeTelegramInfo => 
                            {
                                const inviteeTelegramInfo = message.new_chat_members[index];
                                const inviteeIsBot = inviteeTelegramInfo.is_bot;
                                if
                                (
                                    inviteeIsBot == true
                                )
                                    {
                                        // notify admin about adding bot and who is adding bot
                                        // maybe ban user
                                        // maybe remove bot
                                        
                                    }
                                else
                                    {
                                        let inviteeId;
                                        const inviteeTelegramId = inviteeTelegramInfo.id;
                                        let invitee = await dataAccess.dataApi.getUserByTelegramId(
                                            inviteeTelegramId
                                        );

                                        
                                        if
                                        (
                                            !invitee
                                        )
                                            {
                                                const newInvitee = models.makeUser(
                                                    inviteeTelegramInfo
                                                )
                                                const inviteeInsertedId = await dataAccess.dataApi.addUser(
                                                    newInvitee
                                                )

                                                inviteeId = inviteeInsertedId
            
                                            }
                                        else
                                            {
                                                inviteeId = invitee._id;
                                            }

                                        
                                        const foundInviteeUserEvent = await dataAccess.dataApi.getUserEventByUserAndEvent(
                                            inviteeId,
                                            foundEvent._id
                                        )

                                        if
                                        (
                                            !foundInviteeUserEvent
                                        )
                                            {
                                                const newInviteeUserEvent = models.makeUserEvent(
                                                    {
                                                        user: inviteeId,
                                                        event: foundEvent._id
                                                    }
                                                )
                                                const inviteeUserEventId = await dataAccess.dataApi.addUserEvent(
                                                    newInviteeUserEvent
                                                )

                                                const newInviteeInCreaseCredit = 10;
                                                const updateInviteeCreditResult = await dataAccess.dataApi.increaseUserCredit(
                                                    inviteeId,
                                                    newInviteeInCreaseCredit 
                                                );
                                                const inviteeTitle = 'کاربر جدید'
                                                const newMemberIncreasCreditMessage = `🌷 ${inviteeTitle} خوش آمدید\n شما ${newInviteeInCreaseCredit} اعتبار برای شرکت در چالش ها دریافت کردین. `

                                                await providerServices.telegramBot.sendMessage(
                                                    foundEvent.telegramGroupId,
                                                    newMemberIncreasCreditMessage,
                                                    {}
                                                )

                                                newInviteeUserIdList.push(inviteeId)
                                            }
                                    }
                            }
                        //);

                        console.log(newInviteeUserIdList);
                        if
                        (
                            newInviteeUserIdList.length > 0
                        )
                            {
                                
                                const increasCreditValue = newInviteeUserIdList.length * 10
                                const updateInviterCreditForInvitingResult = await dataAccess.dataApi.increaseUserCredit(
                                    inviterId,
                                    increasCreditValue
                                );
                                console.log('updateInviterCreditForInvitingResult');
                                console.log(updateInviterCreditForInvitingResult);
                                const addCreditForInvitingMessage = `🎊 عضو کانال ${increasCreditValue} اعتبار گرفت به خاطر دعوت از ${newInviteeUserIdList.length} تا از دوستاش.`
                                await providerServices.telegramBot.sendMessage(
                                    foundEvent.telegramGroupId,
                                    addCreditForInvitingMessage,
                                    {}
                                )

                            }
                        
                    }
                

            }
    }