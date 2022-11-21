const models = require('../models');

module.exports = function buildProccessMessage
(
    dataAccess,
    providerServices,
    isUserInTelegramGroup,
    processNewMemberInGroup,
    processCallbackQuery
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
                                console.log("here to process CallbackQuery");
                                await processCallbackQuery(message);
                             }
                        else if
                        (
                            message.update_id &&
                            message.message &&
                            message.message.from &&
                            message.message.chat &&
                            message.message.new_chat_members
                        )
                            {
                                console.log("here to process NewMemberInGroup");
                                await processNewMemberInGroup(message.message);
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