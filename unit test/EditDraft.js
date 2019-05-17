const request = require('request')
var assert = require('assert');

request.get('http://localhost:4000/api/',{json:{username: "testuser"} },
    (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body._id)
    var toSave={
        id:body._id,
        tcID:body.draftList[0]._id,
        name:"GetToDemoAs soon as I can",
        step:[
            {
                step:"User is in Demo mode",
                prefix:"Given",
                state:"green",
                variable:[]
            },
            {
                step:"Verify that user is in Demo mode in '(.*)'",
                prefix:"Then",
                state:"green",
                variable:[
                    {
                        _type:"card",
                        value:"Outdoor"
                    }
                ]
            }
        ]}
    request.post('http://localhost:4000/api/saveDraft', {
        json: toSave
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
        request.get('http://localhost:4000/api/',{json:{username: "testuser"} },(error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            try {
                var variable=[];
                assert.equal(body.username, 'testuser');
                assert.equal(body.draftList.length,1);
                assert.equal(body.draftList[0].step[0].step,toSave.step[0].step);
                assert.equal(body.draftList[0].step[0].prefix,toSave.step[0].prefix);
                assert.equal(body.draftList[0].step[0].state,toSave.step[0].state);
                assert.equal(body.draftList[0].step[0].variable.length,0);

                assert.equal(body.draftList[0].step[1].step,toSave.step[1].step);
                assert.equal(body.draftList[0].step[1].prefix,toSave.step[1].prefix);
                assert.equal(body.draftList[0].step[1].state,toSave.step[1].state);
                assert.equal(body.draftList[0].step[1].variable[0]._type,toSave.step[1].variable[0]._type);
                assert.equal(body.draftList[0].step[1].variable[0].value,toSave.step[1].variable[0].value);

                console.log('The signup was successful.');
            } catch (error) {
                console.error('The signup was not successful.'+ error);
            }
        })
    })
})


