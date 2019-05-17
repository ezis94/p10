const request = require('request')
var assert = require('assert');


var toSave={
    teststeps:[
        "I press on Bottom Menu button",
        "I swipe left to get to All-Around program",
        "Swipe right to go to Outdoor program",
        "Tap on Sound enhancer on Restaurant program",
        "Both hearing aids are connected; left and right",
        "I tap Tinnitus Manager",
        "I press Music program on Top Ribbon Carousell",
        "I press on Program Overview button",
        "I tap Exit to Demo mode button",
        "I set the left hearing aid volume to 8 in Music program",
        "The right hearing aid volueme is set to 2 in All-Around program",
        "I split hearing aid volume bar in Restaurant program",
        "I mute the merged streamer volume in TV1 program",
        "I press Tips more menu item",
        "I press on program card in Outdoor program",
        "Scroll to the bottom of the page",
        "I change Bass to -5"
    ]}
request.post('http://localhost:4000/api/validate', {
    json: toSave
}, (error, res, body) => {

    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(JSON.stringify(body))
    try {
        assert.equal(body[0].userStep, "I press Exit to demo button");
        assert.equal(body[0].stepsInfo[0].DBStep, "I press Exit to demo button" );
        assert.equal(parseFloat(body[0].stepsInfo[0].simVal)>=0.6,true  );
        assert.equal(body[1].userStep, "I swipe left to get to All-Around program");
        assert.equal(body[1].stepsInfo[0].DBStep, "I swipe left to program program" );
        assert.equal(parseFloat(body[1].stepsInfo[0].simVal)>=0.6,true  );


        console.log('The saving was successful.');
    } catch (error) {
        console.error('The saving was not successful.'+ error);
    }
    // request.get('http://localhost:4000/api/testCases',(error, res, body) => {
    //     if (error) {
    //         console.error(error)
    //         return
    //     }
    //     console.log(`statusCode: ${res.statusCode}`)
    //     console.log(body)
    //
    // })
})

