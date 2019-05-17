const request = require('request')
var assert = require('assert');

request.get('http://localhost:4000/api/testCases',(error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(JSON.parse(body)[0]._id)
    var toSave={
        tcID:JSON.parse(body)[0]._id,
        name:"GetToDemo",
        steps:[{
            step:"Applicaiton is on",
            prefix:"Given"
        }]}
    request.post('http://localhost:4000/api/save', {
        json: toSave
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
        request.get('http://localhost:4000/api/testCases',(error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
            try {
                assert.equal(JSON.parse(body)[0].test_case_name, toSave.name);
                assert.equal(JSON.parse(body)[0].steps[0].step, toSave.steps[0].step);
                assert.equal(JSON.parse(body)[0].steps[0].prefix, toSave.steps[0].prefix);
                console.log('The saving was successful.');
            } catch (error) {
                console.error('The saving was not successful.'+ error);
            }
        })
    })
})

