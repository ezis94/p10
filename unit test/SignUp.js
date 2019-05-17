const request = require('request')
var assert = require('assert');


var toSave={
    username:"testuser",
    password:"1234"
}
request.post('http://localhost:4000/api/signup', {
    json: toSave
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
    request.get('http://localhost:4000/api/',{json:toSave },(error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body.username)
        try {
            var variable=[];
            assert.equal(body.username, toSave.username);
            assert.equal(body.draftList.length,0);

            console.log('The signup was successful.');
        } catch (error) {
            console.error('The signup was not successful.'+ error);
        }
    })
})

