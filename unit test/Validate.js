const request = require('request')
var assert = require('assert');


var toValidate={
    teststeps:[
        "I press Exit to demo button",
        "I swipe left to get to All-Around program"

    ]}
request.post('http://localhost:4000/api/validate', {
    json: toValidate
}, (error, res, body) => {

    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
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
})

