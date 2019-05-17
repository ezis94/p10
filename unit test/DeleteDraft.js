const request = require('request')
var assert = require('assert');

request.get('http://localhost:4000/api/',{json:{username: "testuser"} },(error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body._id)
    var TC=body;
    request.post('http://localhost:4000/api/deleteTestCase', {
        json: {
            userID:TC._id,
            tcID:TC.draftList[0]._id
        }
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
            console.log(body)
            try {

                assert.equal(body.draftList.length, 0);


                console.log('The deletion was successful.');
            } catch (error) {
                console.error('The deletion was not successful.'+ error);
            }
        })
    })
})

