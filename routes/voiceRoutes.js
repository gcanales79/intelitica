var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

var VoiceResponse = require('twilio').twiml.VoiceResponse;
var client = require("twilio")(accountSid, authToken);
var survey = require('../survey_data');
var db = require("../models");

var questions = ["From 1 being worst and 5 being excellent. How would you qualify the service given?",
    "From 1 being worst and 5 being excellent. How would you qualify the foods and beverage?",
    "From 1 being worst and 5 being excellent. How satisfy where you with the overall experience",
    "Thank you for your time"]

var questionIndex;

module.exports = function (app) {
    app.post("/call", function (request, response) {
        var CelaLlamar = request.body.celular;
        //console.log("El cel a llamar es " + CelaLlamar);

        var url = "https://8891fd60.ngrok.io/voice"


        var options = {
            to: CelaLlamar,
            from: process.env.TWILIO_PHONE,
            url: url,
        };

        // Place an outbound call to the user, using the TwiML instructions
        // from the /outbound route
        client.calls.create(options,
            function (err, call) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Llamada exitosa SID: " + call.sid)
                    db.Example.create({
                        cliente: request.body.cliente,
                        local: request.body.local,
                        fecha_visita: request.body.fecha_visita,
                        celular: request.body.celular,
                        preguntas_completas: 0,
                       callSid:call.sid,
                    }).then(function (dbResult) {
                        response.json(dbResult)
                        console.log(dbResult)
                    });
                }
            })

    })

    // Create a route that will handle Twilio webhook requests, sent as an
    // HTTP POST to /voice in our application
    app.post('/voice', (request, response) => {
        // Use the Twilio Node.js SDK to build an XML response
        var twiml = new VoiceResponse();
        // var celular = request.body.Called;
        var SID = request.body.CallSid;
        //questionIndex = 0;
        //!Revisar se es la primer pregunta del celular
        db.Example.findOne({
            where: {
                callSid: SID,
            },
        }).then(function (results) {
            //response.json(results);
            questionIndex = results.preguntas_completas;
            console.log("El question Index de /voice es " + questionIndex);

            if (questionIndex < questions.length) {
                const gather = twiml.gather({
                    numDigits: 1,
                    action: "/gather",
                });
                gather.say(questions[questionIndex]);


                // If the user doesn't enter input, loop
                //twiml.redirect('/voice');

                // Render the response as XML in reply to the webhook request
                response.type('text/xml');
                response.send(twiml.toString());
            };
        });

    });

    //* Esto nos permite hacer las siguientes respuestas 
    app.post('/survey', (request, response) => {
        // Use the Twilio Node.js SDK to build an XML response
        var twiml = new VoiceResponse();
        var celular = request.body.Called;
        var SID = request.body.CallSid;
        db.Example.findOne({
            where: {
                callSid: SID,
            },
        }).then(function (results) {
            //response.json(results);
            questionIndex = results.preguntas_completas;
            console.log("Las preguntas completas son" + questionIndex);
            if (questionIndex <= questions.length) {
                const gather = twiml.gather({
                    numDigits: 1,
                    action: "/gather",
                });
                gather.say(questions[questionIndex]);

                // If the user doesn't enter input, loop
                //twiml.redirect('/voice');

                // Render the response as XML in reply to the webhook request
                response.type('text/xml');
                response.send(twiml.toString());
            };
            console.log("El celular al que llame es " + celular);
            console.log("El SID es  " + SID);
        });

    });

    // Create a route that will handle <Gather> input
    app.post('/gather', (request, response) => {
        // Use the Twilio Node.js SDK to build an XML response
        const twiml = new VoiceResponse();
        var SID = request.body.CallSid;
        var input = request.body.Digits;
        db.Example.findOne({
            where: {
                callSid: SID,
            },
        }).then(function (results) {
            //response.json(results);
            questionIndex = results.preguntas_completas;
            console.log("El question Index de gather es: " + questionIndex);
            const twiml = new VoiceResponse();

            if (input) {
                switch (input) {
                    case '1':
                        llenarBase();
                        break;
                    case '2':
                        llenarBase();
                        break;
                    case "3":
                        llenarBase();
                        break;
                    case "4":
                        llenarBase();
                        break;
                    case "5":
                        llenarBase();
                        break;
                    default:
                        twiml.say("Sorry, that is not a valid answer");
                        twiml.redirect('/survey');
                        response.type('text/xml');
                        response.send(twiml.toString());
                        break;
                }
            } else {
                // If no input was sent, redirect to the /voice route
                twiml.redirect('/survey');
            }



            function llenarBase() {
                //!Acomoda la respuestas segun sea la pregunta
                if (questionIndex === 0) {
                    db.Example.update({
                        pregunta_1: input,
                        preguntas_completas: 1,

                    }, {
                            where: {
                                callSid: SID,
                                complete: false,
                                preguntas_completas: 0,
                            }
                        }).then(function (dbExample) {
                            // response.json(dbTodo);
                        });
                }
                if (questionIndex === 1) {
                    db.Example.update({
                        pregunta_2: input,
                        preguntas_completas: 2,

                    }, {
                            where: {
                                callSid: SID,
                                complete: false,
                                preguntas_completas: 1,
                            }
                        }).then(function (dbExample) {
                            // response.json(dbTodo);
                        });
                }
                if (questionIndex === 2) {
                    db.Example.update({
                        pregunta_3: input,
                        complete: true,
                        preguntas_completas: 3,

                    }, {
                            where: {
                                callSid: SID,
                                complete: false,
                                preguntas_completas: 2,
                            }
                        }).then(function (dbExample) {
                            // response.json(dbTodo);
                        });
                }
                //questionIndex++;
                twiml.redirect('/survey');
                response.type('text/xml');
                response.send(twiml.toString());
            };

            //console.log("El celular al que llame es gather " + celular);
            console.log("Las respuesta de la pregunta " + questionIndex + " es " + input);


        });
    });


}