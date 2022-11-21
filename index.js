const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();

const packageJson = require('./package.json');

var app = express();
app.use(bodyParser.json())

app.use(function(req, res, next) 
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, eventid");
        next();
    }
);

const telegramBotServices = require('./src');

app.get('/isAlive', 
    (req, res) => 
        {
            const result = {
                emoji : '🙂',
                name: packageJson.name,
                version : packageJson.version
            }
            sendResult(res, result);
        }
);

app.post('/webhook',
    async (req, res) => {
        try 
            {
                console.log(JSON.stringify(req.body));
                const processMessageResult = await telegramBotServices.proccessMessage(req.body);
        
                const result = {
                    ok: processMessageResult
                };
                sendResult(
                    res,
                    result
                )
            }
        catch (error)
            {
                console.log(error);
                const result = {
                    ok: false
                };
                sendResult(
                    res,
                    result
                )
            }
        

    }
)



// app.get('/challenge/getAllByEvent',
//     async (req, res) =>
//         {
//             try 
//                 {
//                     const eventId = req.headers.eventid;
//                     const challengeList = await challengeServices.getAllChallengeByEvent(
//                         eventId
//                     );
//                     const result = {
//                         challengeList: challengeList
//                     };
//                     sendResult(res, result);
                    
//                 }
//             catch (error)
//                 {
//                     processError(res, error);
//                 }
//         }
// )

// app.post('/challenge/postOnTelegram',
//     async (req,res) => 
//         {
//             try 
//                 {
//                     const challengeId = req.body.challengeId;
//                     if(
//                         challengeId
//                     )
//                         {
//                             const postChallengeResult = await challengeServices.postChallengeOnTelegramChannel(
//                                 challengeId
//                             );
                
//                             const result = {
//                                 postChallengeResult: postChallengeResult 
//                             };
                
//                             console.log(result);
//                             sendResult(
//                                 res,
//                                 result
//                             );
//                         }
//                     else
//                         {
//                             const InvalidParametersError = new Error("Invalid Parameters");
//                             processError(
//                                 res,
//                                 InvalidParametersError
//                             );
//                         }   
//                 }
//             catch (error) 
//                 {
//                     processError(
//                         res,
//                         error
//                     );
//                 }
            

//         }
// )

function sendResult
(
    res,
    data
)
    {
        res.json(data);
    }

function processError(
    res,
    error
)
    {
        console.log(error);
        res.status(400).json(
            {
                message: error.message 
            }
        );
    }

app.listen(packageJson.port,function()
    {
        console.log('Init ' + packageJson.name + ' on ' + packageJson.port);
        console.log('Access URL : http://localhost:' + packageJson.port);
    }
);