const request = require('request')
var assert = require('assert');

request.get('http://localhost:4000/api/testCases',(error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
    var TC=body;
    request.post('http://localhost:4000/api/deleteTestCase', {
        json: {id:TC[0]._id}
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

                assert.equal(JSON.parse(body).length, 0);


                console.log('The deletion was successful.');
            } catch (error) {
                console.error('The deletion was not successful.'+ error);
            }
        })
    })
})

